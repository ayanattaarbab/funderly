import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Creator from '@/models/Creator';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const search = (searchParams.get('search') || '').trim();
  const limit = 9; // Fetch 9 creators at a time
  const skip = (page - 1) * limit;

  try {
    await connectDB();

    // Build the filter. Escape regex special characters so a search like
    // "c++" or "a.j." doesn't throw or match unintended patterns.
    let filter = {};
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      filter = {
        $or: [
          { name: regex },
          { bio: regex },
        ],
      };
    }

    const creators = await Creator.find(filter).skip(skip).limit(limit).lean();
    return NextResponse.json({ creators }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch creators:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}