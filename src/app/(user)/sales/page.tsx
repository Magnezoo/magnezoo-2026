import { Divider, Link } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";
import CountdownTimer from "@/components/Cards/CountdownTimer";
import MediaText from "@/components/Cards/MediaText";

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
    <section className="mb-12">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl border border-[#E48B00]/30 shadow-lg shadow-[#E48B00]/10 px-6 py-8 md:px-10 md:py-10 text-stone-800 transition-all hover:shadow-xl hover:bg-white/95">
        <h2 className="text-2xl font-bold mb-6 text-[#E48B00] border-b-2 border-[#E48B00]/20 pb-2 inline-block">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default async function SalesAppCampainPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FFEECE] font-sans py-12 overflow-hidden">
      {/* 幾何学的な背景アニメーション（元のまま） */}
      <div className="animated-bg-circles" aria-hidden="true">
        <div className="circle circle1" />
        <div className="circle circle2" />
        <div className="circle circle3" />
        <div className="circle circle4" />
        <div className="circle circle5" />
      </div>

      <main className="w-full z-10">
        <div className="relative w-full max-w-4xl mx-auto px-4 leading-relaxed text-center">
          <header className="mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-[#E48B00]/30 shadow-xl shadow-[#E48B00]/10 px-6 py-10 md:px-12 md:py-12">
              <h1 className="text-lg md:text-xl font-bold mb-2 text-[#E48B00]/80 tracking-wide">
                【物販特設サイト】
              </h1>
              <h2 className="text-3xl md:text-4xl mb-6 font-extrabold text-[#E48B00]">
                生徒たちで作るチャリティー企画
              </h2>
              <p className="text-md md:text-lg text-stone-700 mb-6 font-medium">
                生徒から募集した「ウチの子（ペット）」の写真たちが、
                <br className="hidden md:block" />
                ステッカー、缶バッジ、キーホルダーとして販売されます！
              </p>
              <div className="inline-block bg-[#FFEECE]/50 rounded-lg px-4 py-3 text-sm text-stone-600 border border-[#E48B00]/20">
                <p>
                  ※売上金は
                  <Link
                    href="https://jspca.or.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E48B00] font-bold hover:underline mx-1"
                  >
                    (公財)動物愛護協会
                  </Link>
                  へ寄付されます。
                </p>
              </div>
            </div>
          </header>

          <Section title="場所">
            <p className="text-lg font-bold mb-6 text-stone-800">
              幕張メッセ ホール5 物販ブース
              <span className="block text-sm font-normal text-stone-500 mt-1">
                （千葉県千葉市美浜区中瀬2-1）
              </span>
            </p>
            <Link
              href="/img/merchandise/floormap.svg"
              target="_blank"
              rel="noopener noreferrer"
              className="group block text-[#E48B00] hover:text-[#c77a00] transition-colors"
            >
              <p className="mb-3 text-sm font-bold flex items-center justify-center gap-1 group-hover:underline">
                <span>🔍 会場地図を拡大して見る</span>
              </p>
              <div className="overflow-hidden rounded-2xl border-2 border-[#E48B00]/40 group-hover:border-[#E48B00]/80 transition-all shadow-md">
                <Image
                  src="/img/merchandise/floormap.svg"
                  alt="会場地図"
                  width={800}
                  height={700}
                  className="w-full h-auto max-w-2xl mx-auto transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </Link>
            <blockquote className="mt-6 text-sm text-stone-400">
              詳細:{" "}
              <Link
                href="https://www.m-messe.co.jp/facility/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[#E48B00]"
              >
                https://www.m-messe.co.jp/facility/
              </Link>
            </blockquote>
          </Section>

          <Section title="開催日まであと">
            <div className="py-4">
              <CountdownTimer targetDate="2026-04-25T23:59:59" />
            </div>
          </Section>
        </div>

        {/* 商品一覧の区切り */}
        <div className="w-full max-w-6xl mx-auto px-4 my-16">
          <Divider>
            <span className="text-3xl font-extrabold text-[#E48B00] px-6 py-2 bg-[#FFEECE] rounded-full border-2 border-[#E48B00]/20">
              商品一覧
            </span>
          </Divider>
        </div>

        {/* 商品リスト */}
        <div className="relative w-full max-w-6xl mx-auto px-4 leading-relaxed z-10 flex flex-col gap-8 md:gap-12">
          <MediaText
            imageSrc="/img/merchandise/sakura_01.png"
            imageAlt="オリジナルステッカー"
            title="さくらちゃん みんなのウチの子 ステッカー (3枚組)"
            price={500}
            reverse
          />

          <MediaText
            imageSrc="/img/merchandise/sakura_03_badge.png"
            imageAlt="N高本校 さくらちゃん 缶バッチ"
            title="N高本校 さくらちゃん 缶バッチ"
            price={150}
          />

          <MediaText
            imageSrc="/img/merchandise/student_02_badge.png"
            imageAlt="みんなのウチの子 缶バッチ"
            title="みんなのウチの子 缶バッチ"
            price={150}
          />

          <MediaText
            title="N高本校 さくらちゃん アクリルキーホルダー"
            price={800}
            imageSrc="/img/merchandise/sakura_key-holder.png"
            imageAlt="N高本校 さくらちゃん アクリルキーホルダー"
            reverse
          />

          <MediaText
            title="みんなのウチの子 アクリルキーホルダー"
            price={800}
            imageSrc="/img/merchandise/hamuchoco.png"
            imageAlt="みんなのウチの子 アクリルキーホルダー"
            reverse
          />
        </div>
      </main>
    </div>
  );
}
