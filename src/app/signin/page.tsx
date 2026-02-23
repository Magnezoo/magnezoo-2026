import SignInPageClient from "./Client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_to?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { redirect_to: redirectPath } = await searchParams;
  if (session) {
    redirect(redirectPath ?? "/");
  }
  return <SignInPageClient redirectUri={redirectPath} />;
}
