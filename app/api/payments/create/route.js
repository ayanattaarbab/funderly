import { NextResponse } from 'next/server';
import { safepay } from '@/lib/safepay';

export async function POST(req) {
    try {
        const { username, amount, metadata } = await req.json();

        if (!username || !amount || Number(amount) <= 0) {
            return NextResponse.json({ error: 'username and a positive amount are required' }, { status: 400 });
        }

        const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL;
        const orderId = `sup_${username}_${Date.now()}`;
        const isSandbox = (process.env.SAFEPAY_ENV || 'sandbox') === 'sandbox';

        // STEP 1: Create the payment tracker (this part was already correct)
        const sessionResponse = await safepay.payments.session.setup({
            merchant_api_key: process.env.SAFEPAY_MERCHANT_API_KEY,
            intent: 'CYBERSOURCE',
            mode: 'payment',
            currency: 'PKR',
            amount: Math.round(Number(amount) * 100),
            metadata: { order_id: orderId },
        });

        const trackerToken = sessionResponse?.data?.tracker?.token || sessionResponse?.tracker?.token;

        if (!trackerToken) {
            console.error('[safepay] no tracker token in session response:', sessionResponse);
            return NextResponse.json({ error: 'Failed to generate Safepay tracker token' }, { status: 500 });
        }

        // STEP 2 (this was MISSING before): generate a short-lived client
        // authentication token. The hosted checkout page requires this —
        // without it, Safepay silently bounces back to the homepage.
        const authResponse = await safepay.client.passport.create();
       

        const authToken = authResponse?.data || authResponse?.token || authResponse;

        if (!authToken || typeof authToken !== 'string') {
            console.error('[safepay] no auth token in response:', authResponse);
            return NextResponse.json({ error: 'Failed to generate Safepay auth token' }, { status: 500 });
        }

        // STEP 3: Generate the checkout URL using the SDK helper (instead of
        // hand-building the query string). Note `source: 'hosted'` and the
        // new `tbt` param carrying the auth token from step 2.
        const redirectUrl = `${origin}/${username}?payment=success&order_id=${orderId}`;
        const cancelUrl = `${origin}/${username}?payment=cancelled`;

        const checkoutResult = await safepay.checkout.createCheckoutUrl({
            tracker: trackerToken,
            tbt: authToken,
            env: isSandbox ? 'sandbox' : 'production',
            source: 'hosted',
            redirect_url: redirectUrl,
            cancel_url: cancelUrl,
        });

      

        const url = typeof checkoutResult === 'string' ? checkoutResult : checkoutResult?.url;

        if (!url || typeof url !== 'string') {
            console.error('[safepay] could not extract checkout URL from:', checkoutResult);
            return NextResponse.json({ error: 'Failed to generate Safepay checkout URL' }, { status: 500 });
        }


        return NextResponse.json({ url, orderId, tracker: trackerToken }, { status: 200 });
    } catch (error) {
        console.error('[safepay] failed to create payment:', error?.response?.data || error.message || error);
        console.error('[safepay] full error object:', error);
        return NextResponse.json({ error: 'Failed to start payment' }, { status: 500 });
    }
}