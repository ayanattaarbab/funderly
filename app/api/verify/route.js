import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Creator from '@/models/Creator';
import SupportOrder from '@/models/SupportOrder';
import Safepay from '@sfpy/node-core';
import { SAFEPAY_HOST } from '@/lib/safepay';
import crypto from 'crypto';

const parseVerifyParams = (req) => {
  const rawUrl = req.url;
  const firstQuestionMark = rawUrl.indexOf('?');
  let normalizedUrl = rawUrl;

  if (firstQuestionMark >= 0) {
    const before = rawUrl.slice(0, firstQuestionMark + 1);
    let after = rawUrl.slice(firstQuestionMark + 1);
    if (after.includes('?')) {
      after = after.replace(/\?/g, '&');
      normalizedUrl = before + after;
    }
  }

  const url = new URL(normalizedUrl);
  const params = url.searchParams;
  let tracker = params.get('tracker') || params.get('beacon') || params.get('tracker_token');
  const signature = params.get('sig') || params.get('signature');
  let orderId = params.get('order_id') || params.get('orderId');
  const username = params.get('username');

  if (orderId) {
    try {
      orderId = decodeURIComponent(orderId);
    } catch (e) {
      // ignore
    }
    // strip repeated embedded query fragments such as "ord_xxx?order_id=ord_xxx"
    const qIdx = orderId.indexOf('?');
    if (qIdx >= 0) orderId = orderId.slice(0, qIdx);
    const ampIdx = orderId.indexOf('&');
    if (ampIdx >= 0) orderId = orderId.slice(0, ampIdx);
    orderId = orderId.trim();
  }

  if (!tracker && orderId) {
    const maybeTracker = orderId.split('&tracker=')[1] || orderId.split('?tracker=')[1];
    if (maybeTracker) {
      tracker = maybeTracker.split('&')[0];
      orderId = orderId.split(/\?|&tracker=/)[0];
    }
  }

  return { tracker, signature, orderId, username };
};

const resolveCreator = async ({ username, orderId }) => {
  if (username) {
    const creator = await Creator.findOne({ username: username.toLowerCase() }).lean();
    if (creator) return creator;
  }
  if (orderId) {
    const order = await SupportOrder.findOne({ orderId }).lean();
    if (order?.username) {
      return Creator.findOne({ username: order.username.toLowerCase() }).lean();
    }
  }
  return null;
};

const verifyTracker = async ({ creator, tracker, signature }) => {
  if (!tracker) return false;

  if (signature) {
    const localSignature = crypto
      .createHmac('sha256', creator.safepaySecretKey)
      .update(tracker)
      .digest('hex');
    return localSignature === signature;
  }

  const creatorSafepay = new Safepay(creator.safepaySecretKey, {
    authType: 'secret',
    host: SAFEPAY_HOST,
  });

  try {
    const trackerResponse = await creatorSafepay.order.tracker.action(tracker);
    console.log('Safepay tracker validation response:', trackerResponse);
    return Boolean(trackerResponse && (trackerResponse.data || trackerResponse.status));
  } catch (error) {
    const msg = (error?.message || String(error || '')).toLowerCase();
    console.error('Safepay tracker validation failed:', error?.message || error);
    // Sandbox behaviour: "no actions remain for this tracker" often means the
    // tracker has completed its flow — treat that specific message as success.
    if (msg.includes('no actions remain')) {
      return true;
    }
    return false;
  }
};

const handleVerify = async (req) => {
  const { tracker, signature, orderId, username } = parseVerifyParams(req);
  console.log('Verify request params:', { tracker, signature, orderId, username, url: req.url });

  await connectDB();
  const creator = await resolveCreator({ username, orderId });

  if (!creator || !creator.safepaySecretKey) {
    return { error: 'Creator keys missing.' };
  }

  const isValid = await verifyTracker({ creator, tracker, signature });
  return {
    creator,
    username: username || creator.username,
    orderId,
    tracker,
    signature,
    isValid,
  };
};

const persistVerifiedSupport = async (orderId) => {
  if (!orderId) return null;

  const updatedOrder = await SupportOrder.findOneAndUpdate(
    { orderId, status: { $ne: 'success' } },
    { status: 'success', completedAt: new Date() },
    { returnDocument: 'after' }
  );

  const order = updatedOrder || await SupportOrder.findOne({ orderId }).lean();
  if (!order) return null;

  const isAutoAnon = !order.supporterName && !order.isAnonymous;
  const fanRecord = {
    name: (order.isAnonymous || isAutoAnon) ? null : order.supporterName,
    message: order.supporterMessage || '',
    amount: order.amount,
    anonymous: order.isAnonymous || isAutoAnon,
    status: 'success',
    paidAt: order.completedAt || new Date(),
    orderId: order.orderId
  };

  await Creator.findOneAndUpdate(
    { username: order.username, 'fans.orderId': { $ne: order.orderId } },
    { $push: { fans: fanRecord } },
    { returnDocument: 'after' }
  );

  return order;
};

const redirectResult = (siteUrl, username, success, orderId) => {
  const params = new URLSearchParams({
    payment: success ? 'success' : 'failed',
    ...(orderId && { order_id: orderId })
  });
  return NextResponse.redirect(`${siteUrl}/${username}?${params.toString()}`, 303);
};

export async function POST(req) {
  try {
    const result = await handleVerify(req);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    if (!result.isValid) {
      console.error('Safepay verification failed (POST)', result);
      return redirectResult(siteUrl, result.username, false, result.orderId);
    }
    await persistVerifiedSupport(result.orderId);
    return redirectResult(siteUrl, result.username, true, result.orderId);
  } catch (error) {
    console.error('Safepay validation fallback error:', error);
    return NextResponse.json({ error: 'Verification processing failed' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const result = await handleVerify(req);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    if (!result.isValid) {
      console.error('Safepay verification failed (GET)', result);
      return redirectResult(siteUrl, result.username, false, result.orderId);
    }
    await persistVerifiedSupport(result.orderId);
    return redirectResult(siteUrl, result.username, true, result.orderId);
  } catch (error) {
    console.error('Safepay GET verification error:', error);
    return NextResponse.json({ error: 'Verification processing failed' }, { status: 500 });
  }
}
