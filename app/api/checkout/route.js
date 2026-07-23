import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Creator from '@/models/Creator';
import SupportOrder from '@/models/SupportOrder';
import Safepay from '@sfpy/node-core';
import { SAFEPAY_HOST } from '@/lib/safepay';

export async function POST(req) {
  try {
    const { username, amount, currency, supporterName, supporterMessage, isAnonymous } = await req.json();

    await connectDB();
    const creator = await Creator.findOne({ username: username.toLowerCase() }).lean();

    if (!creator || !creator.safepayPublicKey) {
      return NextResponse.json({ error: "Creator not found" }, { status: 400 });
    }

    

    const orderId = `ord_${Date.now()}`;

    const payload = {
      amount: parseFloat(amount),
      currency: currency || 'PKR'
    };

    // Persist the orderId -> username mapping so verification can recover when
    // Safepay strips query params on redirect.
    try {
      await SupportOrder.create({ 
        orderId, 
        username: creator.username, 
        amount: parseFloat(amount), 
        currency: currency || 'PKR',
        supporterName: supporterName || null,
        supporterMessage: supporterMessage || null,
        isAnonymous: isAnonymous || false
      });
    } catch (e) {
      console.warn('SupportOrder persistence failed (non-fatal):', e?.message || e);
    }

    // Use SafePay SDK to create session, auth token and checkout URL using the creator's own secret
    const isSandbox = process.env.SAFEPAY_ENV === 'sandbox';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (!creator.safepaySecretKey) {
      return NextResponse.json({ error: 'Creator safepay secret key missing' }, { status: 400 });
    }

    const creatorSafepay = new Safepay(creator.safepaySecretKey, {
      authType: 'secret',
      host: SAFEPAY_HOST,
    });

    // 1) Create a tracker/session using the creator's merchant key
    const sessionResponse = await creatorSafepay.payments.session.setup({
      merchant_api_key: creator.safepayPublicKey,
      intent: 'CYBERSOURCE',
      mode: 'payment',
      currency: payload.currency,
      amount: Math.round(Number(payload.amount) * 100),
      metadata: { order_id: orderId }
    });


    const trackerToken = sessionResponse?.data?.tracker?.token || sessionResponse?.tracker?.token;
    if (!trackerToken) {
      console.error('Safepay session did not return a tracker token', sessionResponse);
      return NextResponse.json({ error: 'Failed to initialize Safepay tracker.' }, { status: 500 });
    }
    // 2) Create a short-lived client auth token required by hosted checkout
    const authResponse = await creatorSafepay.client.passport.create();
    const authToken = authResponse?.data || authResponse?.token || authResponse;
    if (!authToken || typeof authToken !== 'string') {
      console.error('Safepay did not return an auth token', authResponse);
      return NextResponse.json({ error: 'Failed to generate Safepay auth token' }, { status: 500 });
    }

    // 3) Build redirect and cancel URLs (site-facing)
    const redirectUrl = `${siteUrl}/api/verify?username=${creator.username}&order_id=${orderId}`;
    const cancelUrl = `${siteUrl}/${creator.username}?payment=cancelled`;

    // 4) Use SDK helper to create the hosted checkout URL
    const checkoutResult = creatorSafepay.checkout.createCheckoutUrl({
      tracker: trackerToken,
      tbt: authToken,
      env: isSandbox ? 'sandbox' : 'production',
      source: 'hosted',
      redirect_url: redirectUrl,
      cancel_url: cancelUrl,
      order_id: orderId
    });

    const finalUrl = typeof checkoutResult === 'string' ? checkoutResult : checkoutResult?.url;
    if (!finalUrl) {
      console.error('Could not build SafePay checkout URL', checkoutResult);
      return NextResponse.json({ error: 'Failed to generate Safepay checkout URL' }, { status: 500 });
    }

    return NextResponse.json({ url: finalUrl, orderId: orderId });

  } catch (error) {
    console.error('Checkout route error:', error?.response?.data || error?.message || error);
    console.error('Full error object:', error);
    return NextResponse.json({ error: "Server Error", details: error?.message || String(error) }, { status: 500 });
  }
}