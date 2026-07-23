import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb'; 
import Creator from '@/models/Creator';
import SupportOrder from '@/models/SupportOrder';
import CreatorProfile from '@/components/Page';

// Dynamic SEO & OpenGraph Metadata
export async function generateMetadata({ params }) {
  const { username } = await params;
  await connectDB();

  // Fetch only the fields needed for SEO to keep metadata loading ultra-fast
  const creator = await Creator.findOne({ 
    username: username?.toLowerCase() 
  })
  .select('name username bio avatarUrl')
  .lean();

  if (!creator) {
    return {
      title: 'Creator Not Found | Funderly',
      description: 'The requested creator profile could not be found on Funderly.',
    };
  }

  const displayName = creator.name || creator.username;
  const pageTitle = `Support ${displayName} on Funderly`;
  const pageDescription = creator.bio 
    ? creator.bio.slice(0, 155) 
    : `Join ${displayName}'s community on Funderly. Support their creative work directly with secure, one-time contributions.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://funderly.com/${creator.username}`,
      siteName: 'Funderly',
      images: creator.avatarUrl ? [{ url: creator.avatarUrl }] : [],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: creator.avatarUrl ? [creator.avatarUrl] : [],
    },
  };
}

export default async function CreatorPage({ params }) {
  const { username } = await params;
  await connectDB(); 

  const rawCreator = await Creator.findOne({ 
    username: username?.toLowerCase() 
  }).lean();

  if (!rawCreator) {
    notFound();
  }

  // Build supporter/fan list from the creator record when available.
  const safeCreator = JSON.parse(JSON.stringify(rawCreator));
  const creatorFans = safeCreator.fans?.filter((fan) => fan.status === 'success').map((fan) => ({
    name: fan.anonymous || !fan.name ? 'Anonymous' : fan.name,
    amount: fan.amount,
    message: fan.message || '',
    anonymous: fan.anonymous || !fan.name,
    status: fan.status || 'success',
    orderId: fan.orderId || null,
    time: fan.paidAt ? new Date(fan.paidAt).toLocaleDateString() : 'Recently'
  })) || [];

  // Fallback to support orders if the creator record doesn't yet contain fans.
  const supporters = creatorFans.length > 0 ? creatorFans : await SupportOrder.find({
    username: rawCreator.username,
    status: 'success'
  })
  .sort({ completedAt: -1 })
  .limit(50)
  .lean()
  .then((orders) => orders.map(order => {
    const isAutoAnon = !order.supporterName;
    return {
      name: isAutoAnon ? 'Anonymous' : order.supporterName,
      amount: order.amount,
      message: order.supporterMessage || '',
      anonymous: order.isAnonymous || isAutoAnon,
      status: order.status,
      orderId: order.orderId,
      time: order.completedAt ? new Date(order.completedAt).toLocaleDateString() : 'Recently'
    };
  }));

  const totalRaised = supporters.reduce((sum, support) => sum + (support.amount || 0), 0);
  const stats = {
    supporterCount: supporters.length,
    totalRaised
  };

  // SECURITY SANITIZATION: Strip out the secret key before passing to the client component.
  const { safepaySecretKey, ...clientCreatorData } = safeCreator;

  return <CreatorProfile creator={{ ...clientCreatorData, supporters, stats }} />;
}