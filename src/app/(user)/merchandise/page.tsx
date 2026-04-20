import { Alert, Link as MUILink } from "@mui/material";
import type { Metadata } from "next";
import { headers } from "next/headers";
import PostButton from "@/components/Buttons/Post";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "あなたのウチの子が商品に！？ - Magnezoo 物販企画",
  description:
    "Magnezoo物販企画(仮)は、生徒から募集した「ウチの子（ペット）」の写真をもとに制作する、ネット企画Magnezoo発の物販企画です。こちらから写真を応募できます。ここでしか手に入らない、尊くて愛しい限定アイテムを展開します。",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="bg-white/90 rounded-2xl border border-[#E48B00]/20 px-10 py-10 text-black">
        <h2 className="text-xl font-bold mb-4 text-[#E48B00]">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default async function SalesAppCampainPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FFEECE] font-sans text-black py-10 overflow-hidden">
      {/* 幾何学的な背景アニメーション */}
      <div className="animated-bg-circles" aria-hidden="true">
        <div className="circle circle1" />
        <div className="circle circle2" />
        <div className="circle circle3" />
        <div className="circle circle4" />
        <div className="circle circle5" />
      </div>
      <main className="relative w-full max-w-4xl mx-auto px-2 text-center leading-relaxed z-10">
        <header className="mb-8">
          <div className="bg-white/95 rounded-2xl border border-[#E48B00]/20 px-10 py-8 mb-2">
            <h1 className="text-2xl font-bold mb-2 text-[#E48B00]">
              【物販企画】
            </h1>
            <h2 className="text-3xl font-bold mb-0 text-[#E48B00]">
              あなたのウチの子が商品に！？
            </h2>
          </div>
        </header>

        <Section title="企画概要">
          <p className="mb-2 leading-normal [&_span]:inline-block max-w-xl mx-auto">
            <span>
              <span>
                <span>Magnezoo物販企画(仮)は、</span>
                <span>生徒から募集した</span>
              </span>
              <span>
                <span>「ウチの子（ペット）」の</span>
                <span>写真をもとに</span>
                <span>制作する、</span>
              </span>
              <span>
                <span>ネット企画Magnezoo発の</span>
                <span>物販企画です。</span>
              </span>
              <span>
                <span>ここでしか手に入らない、</span>
                <span>
                  <span>尊くて愛しい</span>限定アイテムを
                </span>
              </span>
              <span>展開します。</span>
            </span>
          </p>
        </Section>

        <Section title="企画概要">
          <p className="mb-2 leading-normal [&_span]:inline-block max-w-7xl mx-auto">
            <span>
              <span>
                <span>Magnezoo物販企画(仮)は、</span>
                <span>生徒から募集した</span>
              </span>
              <span>
                <span>「ウチの子（ペット）」の</span>
                <span>写真をもとに</span>
                <span>制作する、</span>
              </span>
              <span>
                <span>ネット企画Magnezoo発の</span>
                <span>物販企画です。</span>
              </span>
              <span>
                <span>ここでしか手に入らない、</span>
                <span>
                  <span>尊くて愛しい</span>限定アイテムを
                </span>
              </span>
              <span>展開します。</span>
            </span>
          </p>
        </Section>
      </main>
    </div>
  );
}
