import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Creator from "@/models/Creator";
import Create from "@/components/Create";

export default async function CreatePage() {
  const session = await auth();

  if (session?.user) {
    await connectDB();
    const userId = session.user.id || session.user.email;
    const existing = await Creator.findOne({ userId }).select("_id").lean();

    if (existing) {
      redirect("/dashboard");
    }
  }

  return <Create session={session} />;
}

export const metadata = {
  title: 'Create Your Profile | Funderly',
  description: 'Set up your Funderly creator page in minutes. Connect your payout account and start accepting secure, one-time support directly from your fans.',
};