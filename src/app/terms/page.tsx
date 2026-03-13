import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "利用規約",
  description: "Magnezooの利用規約ページです。",
};

export default async function TermsPage() {
  redirect("/legal/terms");
}
