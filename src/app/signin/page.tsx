import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignInPageClient from "./Client";

export const metadata: Metadata = {
  title: "サインイン",
  description: "Magnezooのサインインページです。",
};

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
