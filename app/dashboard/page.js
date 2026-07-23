import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Creator from "@/models/Creator";
import Dashboard from "@/components/Dashboard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  await connectDB();
  const userId = session.user.id || session.user.email;
  const creatorDoc = await Creator.findOne({ userId }).lean();

  if (!creatorDoc) {
    redirect("/create");
  }

  const creator = JSON.parse(JSON.stringify(creatorDoc));
  return <Dashboard creator={creator} />;
}

export const metadata = {
  title: 'Dashboard | Funderly',
  description: 'Manage your Funderly page, track your earnings, view your supporters, and optimize your creator profile from your personalized dashboard.',
};