import { auth } from "@/auth";
import Explore from "@/components/Explore";

export default async function Page() {
  const session = await auth();
  const initialCreator = session?.user
    ? { name: session.user.name, avatarUrl: session.user.image }
    : null;

  return <Explore isSignedIn={!!session} initialCreator={initialCreator} />;
}

export const metadata = {
  title: 'Explore Creators | Funderly',
  description: 'Discover and support emerging creators, artists, and developers on Funderly. Find your next favorite project and back the people behind it.',
};