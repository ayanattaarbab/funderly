// app/api/check-username/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Creator from '@/models/Creator';

// Reserved words you don't want people claiming as usernames
const RESERVED = ['admin', 'api', 'create', 'login', 'signup', 'signin' , 'dashboard', 'explore', 'settings', 'support'];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get('username');

    if (!raw || typeof raw !== 'string') {
      return NextResponse.json(
        { available: false, reason: 'empty', message: 'Username is required.' },
        { status: 400 }
      );
    }

    const username = raw.trim().toLowerCase();

    // Format validation — adjust the regex to match whatever rules you want
    const validFormat = /^[a-z0-9_.]{3,30}$/.test(username);
    if (!validFormat) {
      return NextResponse.json(
        {
          available: false,
          reason: 'invalid',
          message: 'Only letters, numbers, underscores and dots — 3 to 30 characters.',
        },
        { status: 200 }
      );
    }

    if (RESERVED.includes(username)) {
      return NextResponse.json(
        { available: false, reason: 'reserved', message: 'This username is not available.' },
        { status: 200 }
      );
    }

    await connectDB();

    // Case-insensitive check regardless of how it's stored in the DB
    const existing = await Creator.findOne({
      username: { $regex: `^${username}$`, $options: 'i' },
    })
      .select('_id')
      .lean();

    if (existing) {
      return NextResponse.json(
        { available: false, reason: 'taken', message: 'This username is already taken!' },
        { status: 200 }
      );
    }

    return NextResponse.json({ available: true, username }, { status: 200 });
  } catch (err) {
    console.error('check-username error:', err);
    return NextResponse.json(
      { available: false, reason: 'error', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}