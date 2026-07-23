import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    console.log('[safepay] payment logged', {
      ...body,
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[safepay] failed to log payment:', error);
    return NextResponse.json({ error: 'Failed to log payment' }, { status: 500 });
  }
}