import { Divider, Link, Link as MUILink } from "@mui/material";
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
    <section className="mb-10">
      <div className="bg-white/90 rounded-2xl border border-[#E48B00]/20 px-10 py-10 text-black">
        <h2 className="text-xl font-bold mb-4 text-[#E48B00]">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default async function SalesAppCampainPage() {
  // const session = await auth.api.getSession({ headers: await headers() });
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
      <main>
        <div className="relative w-full max-w-4xl mx-auto px-4 leading-relaxed z-10 text-center">
          <header className="mb-8">
            <div className="bg-white/95 rounded-2xl border border-[#E48B00]/20 px-10 py-8 mb-2">
              <h1 className="text-2xl font-bold mb-2 text-[#E48B00]">
                【物販特設サイト】
              </h1>
              <h2 className="text-3xl mb-6 font-bold text-[#E48B00]">
                生徒たちで作るチャリティー企画
              </h2>
              <p className="text-md text-[#E48B00] mb-2">
                生徒から募集した「ウチの子（ペット）」の写真たちが、物販でステッカー、缶バッジ、キーホルダーとして販売されます！
              </p>
              <p className="mb-2 ">
                ※売上金は
                <Link
                  href="https://jspca.or.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (公財)動物愛護協会
                </Link>
                へ寄付されます。
              </p>
            </div>
          </header>

          <Section title="場所">
            <p className="text-md font-bold mb-4 text-[#E48B00]">
              幕張メッセ ホール5 物販ブース（千葉県千葉市美浜区中瀬2-1）
            </p>
            <Link
              href="/img/merchandise/floormap.svg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E48B00] hover:underline"
            >
              <p className="mb-2">会場地図を拡大して見る</p>
              <Image
                src="/img/merchandise/floormap.svg"
                alt="会場地図"
                width={800}
                height={700}
                className="mx-auto rounded-lg border-2 border-[#E48B00]/80 w-full h-auto max-w-2xl"
              />
            </Link>
            <blockquote className="pl-4 italic mt-4 text-[#E48B00]/80">
              <Link
                href="https://www.m-messe.co.jp/facility/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.m-messe.co.jp/facility/
              </Link>
            </blockquote>
          </Section>

          <Section title="開催日まであと">
            <CountdownTimer targetDate="2026-04-25T23:59:59" />
          </Section>
        </div>

        <Divider>
          <h2 className="text-3xl font-bold text-[#E48B00] mb-8 mt-12 text-center">
            商品一覧
          </h2>
        </Divider>

        <div className="relative w-[80vw] max-w-7xl mx-auto leading-relaxed z-10">
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
