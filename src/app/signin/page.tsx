import SignInPageClient from "./Client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectPath?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { redirectPath } = await searchParams;
  if (session) {
    redirect(redirectPath ?? "/");
  }
  return <SignInPageClient redirectUri={redirectPath} />;
}
