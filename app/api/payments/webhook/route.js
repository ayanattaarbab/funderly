import { NextResponse } from 'next/server';
import { safepay } from '@/lib/safepay';
import { connectDB } from '@/lib/mongodb';
import SupportOrder from '@/models/SupportOrder';
import Creator from '@/models/Creator';

export async function POST(req) {
  try {
    const valid = await safepay.verify.webhook(req);

    if (!valid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = await req.json();
    await connectDB();

    // Extract orderId from payload (SafePay includes metadata.order_id)
    const orderId = payload?.metadata?.order_id || payload?.order_id;
    
    console.log('[safepay] webhook event:', {
      orderId,
      status: payload?.status,
      payload,
      at: new Date().toISOString(),
    });

    if (!orderId) {
      console.warn('[safepay] webhook missing order_id, cannot track', payload);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Update SupportOrder based on payment status
    // SafePay statuses: pending, processing, completed, failed, cancelled
    let updateStatus = 'pending';
    
    if (payload?.status === 'completed') {
      updateStatus = 'success';
    } else if (payload?.status === 'cancelled' || payload?.status === 'failed') {
      updateStatus = 'cancelled';
    }

    const updatedOrder = await SupportOrder.findOneAndUpdate(
      { orderId, status: { $ne: 'success' } },
      {
        status: updateStatus,
        completedAt: updateStatus !== 'pending' ? new Date() : null
      },
      { returnDocument: 'after' }
    );

    if (updatedOrder && updateStatus === 'success') {
      const isAutoAnon = !updatedOrder.supporterName && !updatedOrder.isAnonymous;
      const fanRecord = {
        name: (updatedOrder.isAnonymous || isAutoAnon) ? null : updatedOrder.supporterName,
        message: updatedOrder.supporterMessage || '',
        amount: updatedOrder.amount,
        anonymous: updatedOrder.isAnonymous || isAutoAnon,
        status: 'success',
        paidAt: updatedOrder.completedAt || new Date(),
        orderId: updatedOrder.orderId
      };

      await Creator.findOneAndUpdate(
        { username: updatedOrder.username },
        { $push: { fans: fanRecord } },
        { returnDocument: 'after' }
      );
    }

    console.log('[safepay] updated SupportOrder:', {
      orderId,
      newStatus: updateStatus,
      record: updatedOrder
    });

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[safepay] webhook handling failed:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}