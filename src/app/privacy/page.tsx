import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Magnezooのプライバシーポリシーページです。",
};

export default async function PrivacyPage() {
  redirect("/legal/privacy");
}
