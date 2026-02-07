import { Suspense } from "react";
import Home from "./pageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waiting... - Magnezoo 〜みんなのウチの子決定戦！〜",
  description:
    "磁石祭企画 Magnezoo の公式サイトです。企画開始まで、今しばらくお待ちください！",
};

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
