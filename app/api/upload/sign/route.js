import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ secure: true });

export async function POST(req) {
  try {
    const { folder } = await req.json();
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      cloudinary.config().api_secret
    );

    return NextResponse.json({
      timestamp,
      signature,
      cloudName: cloudinary.config().cloud_name,
      apiKey: cloudinary.config().api_key,
      folder,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed generating signature' }, { status: 500 });
  }
}