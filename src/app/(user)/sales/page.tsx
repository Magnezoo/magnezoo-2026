import { Divider, Link } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";
import CountdownTimer from "@/components/Cards/CountdownTimer";
import MediaText from "@/components/Cards/MediaText";

export const metadata: Metadata = {
  title: "あなたのウチの子が商品に！？ - Magnezoo 物販企画",
  description:
    "Magnezoo物販企画(仮)は、生徒から募集した「ウチの子（ペット）」の写真をもとに制作する、ネット企画Magnezoo発の物販企画です。こちらから写真を応募できます。ここでしか手に入らない、尊くて愛しい限定アイテムを展開します。",
  openGraph: {
    images: "/img/kv_booth.png",
  },
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

export default function SalesAppCampaignPage() {
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
        <div className="w-full max-w-5xl mx-auto px-4 mb-8 md:mb-12 mt-4 md:mt-0">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl shadow-[#E48B00]/10 border-4 border-white/60">
            <Image
              src="/img/kv_booth.png"
              alt="Magnezoo 物販企画 キービジュアル"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
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
            price={200}
            reverse
          />

          <MediaText
            imageSrc="/img/merchandise/sakura_03_badge.png"
            imageAlt="N高本校 さくらちゃん 缶バッチ"
            title="N高本校 さくらちゃん 缶バッチ"
            price={200}
          />

          <MediaText
            imageSrc="/img/merchandise/student_02_badge.png"
            imageAlt="みんなのウチの子 缶バッチ"
            title="みんなのウチの子 缶バッチ"
            price={200}
          />

          <MediaText
            title="N高本校 さくらちゃん アクリルキーホルダー"
            price={500}
            imageSrc="/img/merchandise/sakura_key-holder.png"
            imageAlt="N高本校 さくらちゃん アクリルキーホルダー"
            reverse
          />

          <MediaText
            title="みんなのウチの子 アクリルキーホルダー"
            price={500}
            imageSrc="/img/merchandise/hamuchoco.png"
            imageAlt="みんなのウチの子 アクリルキーホルダー"
            reverse
          />
        </div>
        <div className="w-full max-w-4xl mx-auto px-4 mt-20 mb-8 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-[#E48B00]/40 shadow-xl shadow-[#E48B00]/10 px-8 py-10 md:py-12 transform transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#E48B00]/20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#E48B00] mb-4 flex items-center justify-center gap-2">
              <span aria-hidden="true">🐾</span>
              ぜひ会場へお越しください！
              <span aria-hidden="true">🐾</span>
            </h2>
            <p className="text-md md:text-lg text-stone-700 font-medium leading-relaxed">
              可愛い「ウチの子」たちの限定グッズをたくさんご用意しています。
              <br className="hidden md:block" />
              皆さまのご来場を、心よりお待ちしております！
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
