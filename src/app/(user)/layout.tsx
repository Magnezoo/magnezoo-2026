import type { Metadata } from "next";
import "../globals.css";
import NameSettingGuard from "@/components/Dialogs/NameSettingGuard";
import Header from "@/components/Header";
import MUIWrapper from "@/components/MUIWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s - Magnezoo",
    default: "Magnezoo - みんなのウチの子決定戦！",
  },
  description:
    "Magnezooは、みんなのウチの子（ペットやキャラクターなど）を投稿して競う楽しいコンテストサイトです。かわいい、面白い、個性的なウチの子たちが大集合！ユーザーはお気に入りのウチの子に投票したり、コメントを残したりできます。さあ、あなたのウチの子も参加してみませんか？",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MUIWrapper>
      <Header />
      {children}
      <NameSettingGuard />
    </MUIWrapper>
  );
}
