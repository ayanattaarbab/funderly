import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Homepage from "../components/Homepage";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <Homepage />;
}

export const metadata = {
  title: 'Funderly | Fund Your Creative Journey',
  description: 'Funderly is the ultimate platform for creators, artists, and developers to receive direct financial support from their communities. Start funding your work today.',
};