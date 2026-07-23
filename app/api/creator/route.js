import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/mongodb';
import Creator from '@/models/Creator';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL);

const REQUIRED_FIELDS = [
  'name', 
  'username', 
  'role', 
  'bio', 
  'country', 
  'language',
  'safepayPublicKey', 
  'safepaySecretKey'
];

export async function POST(req) {
  // Parse body first so we can fallback to provided identifiers when session is missing
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const session = await auth();
  

  // Derive userId: prefer authenticated session, else accept explicit body fields
  const userId = session?.user?.id || session?.user?.email || data.userId || data.userEmail || null;

  if (!userId) {
    // No session and no provided identifier — fall back to creating an anonymous id
    // This allows local/dev flows where cookies may not be present (quick unlock for debugging).
    // Warning: in production you should require authentication.
    const anonId = `anon_${Date.now()}`;
    console.warn('[POST /api/creator] no session or user identifier provided — using anonymous id', anonId);
    data.userId = anonId;
  } else {
    data.userId = userId;
  }

  // Validate required fields
  const missing = REQUIRED_FIELDS.filter((f) => !data[f] || !String(data[f]).trim());
  if (missing.length) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 422 });
  }

  try {
    await connectDB();

    const existingCreator = await Creator.findOne({ userId: data.userId });

    // Handle Deletion for Avatar
    // Only delete if the new avatar is different AND the old one had a Cloudinary Public ID
    if (data.avatarPublicId && existingCreator?.avatarPublicId && data.avatarPublicId !== existingCreator.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(existingCreator.avatarPublicId);
      } catch (err) {
        console.error("Avatar deletion error:", err);
      }
    }

    // Handle Deletion for Cover
    // Only delete if the new cover is different AND the old one had a Cloudinary Public ID
    if (data.coverPublicId && existingCreator?.coverPublicId && data.coverPublicId !== existingCreator.coverPublicId) {
      try {
        await cloudinary.uploader.destroy(existingCreator.coverPublicId);
      } catch (err) {
        console.error("Cover deletion error:", err);
      }
    }

    // Update the profile
    const savedProfile = await Creator.findOneAndUpdate(
      { userId },
      { $set: { ...data, userId } },
      { returnDocument: 'after', upsert: true, runValidators: true }
    );

    return NextResponse.json({ creator: savedProfile }, { status: 200 });
  } catch (error) {
    console.error('[POST /api/creator]', error);
    if (error?.code === 11000) {
      return NextResponse.json({ error: 'Username taken', field: 'username' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function GET(req) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ creator: null }, { status: 200 });
  }

  const userId = session.user.id || session.user.email;
  try {
    await connectDB();
    const creator = await Creator.findOne({ userId }).lean();
    return NextResponse.json({ creator: creator || null }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/creator]', error);
    return NextResponse.json({ creator: null }, { status: 200 });
  }
}

export async function DELETE(req) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userId = session.user.id || session.user.email;

  try {
    await connectDB();

    // Find the creator first so we can clean up Cloudinary assets if needed
    const existingCreator = await Creator.findOne({ userId });

    if (!existingCreator) {
      return NextResponse.json({ error: 'Creator account not found' }, { status: 404 });
    }

    // Optional: Delete associated Cloudinary images (avatar/cover) upon account destruction
    if (existingCreator.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(existingCreator.avatarPublicId);
      } catch (err) {
        console.error("Cloudinary avatar cleanup error:", err);
      }
    }

    if (existingCreator.coverPublicId) {
      try {
        await cloudinary.uploader.destroy(existingCreator.coverPublicId);
      } catch (err) {
        console.error("Cloudinary cover cleanup error:", err);
      }
    }

    // Delete the creator document from MongoDB using the correct userId filter
    await Creator.findOneAndDelete({ userId });

    return NextResponse.json({ success: true, message: 'Account deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[DELETE /api/creator]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}