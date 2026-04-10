import type { Metadata } from "next";
import "../globals.css";
import "./user.css";
import { Stack } from "@mui/material";
import { headers } from "next/headers";
import Link from "next/link";
import NameSettingGuard from "@/components/Dialogs/NameSettingGuard";
import Header from "@/components/Header";
import MUIWrapper from "@/components/MUIWrapper";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    template: "%s - Magnezoo",
    default: "Magnezoo - みんなのウチの子決定戦！",
  },
  description:
    "Magnezooは、みんなのウチの子（ペットやキャラクターなど）を投稿して競う楽しいコンテストサイトです。かわいい、面白い、個性的なウチの子たちが大集合！ユーザーはお気に入りのウチの子に投票したり、コメントを残したりできます。さあ、あなたのウチの子も参加してみませんか？",
};

export default async function RootLayout({
  children,
  detail,
}: Readonly<{
  children: React.ReactNode;
  detail: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <MUIWrapper>
      <Header session={session?.session} />
      {children}
      {detail}
      <Stack
        component={"footer"}
        alignItems="center"
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        px={2}
        py={2}
        bgcolor={"gray"}
      >
        <span className="text-sm text-white text-center">
          &copy; 2026 Magnezoo 製作委員会 All rights reserved. Server provided
          by{" "}
          <Link
            href="https://uniproject.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
          >
            デジタル創作サークルUniProject
          </Link>
          .
        </span>
        <Stack direction="row" spacing={2}>
          <Link
            href="/terms"
            className="text-sm text-white underline hover:opacity-80 transition-opacity"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-white underline hover:opacity-80 transition-opacity"
          >
            プライバシー・ポリシー
          </Link>
        </Stack>
      </Stack>
      <NameSettingGuard />
    </MUIWrapper>
  );
}
