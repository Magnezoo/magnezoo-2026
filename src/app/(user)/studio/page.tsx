import { Link as MUILink } from "@mui/material";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { forbidden } from "next/navigation";
import PostButton from "@/components/Buttons/Post";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Magnezoo × 磁石祭2026 ライブスタジオ 連携企画！",
  description:
    "Magnezooは、生徒から募集した「ウチの子（ペット）」の写真をもとに制作するネット企画です。今年はなんと、ライブスタジオと協力して最高に「かわいい」時間をお届けします！",
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
      <div className="bg-white/90 rounded-2xl border border-[#E48B00]/20 px-6 py-8 md:px-10 md:py-10 text-black shadow-sm">
        <h2 className="text-xl font-semibold! mb-6 text-[#E48B00] border-b border-[#E48B00]/10 pb-2 inline-block">
          {title}
        </h2>
        <div className="text-left md:text-center">{children}</div>
      </div>
    </section>
  );
}

export default async function SalesAppCampainPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role !== "admin") forbidden();
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#FFEECE] font-sans text-black py-10 overflow-x-hidden">
      {/* 幾何学的な背景アニメーション */}
      <div className="animated-bg-circles" aria-hidden="true">
        <div className="circle circle1" />
        <div className="circle circle2" />
        <div className="circle circle3" />
        <div className="circle circle4" />
        <div className="circle circle5" />
      </div>

      <main className="relative w-full max-w-4xl mx-auto px-4 text-center leading-relaxed z-10">
        <header className="mb-8">
          <div className="bg-white/95 rounded-2xl border border-[#E48B00]/20 px-6 py-8 md:px-10 shadow-md">
            <p className="text-lg font-bold! text-[#E48B00] mb-1">
              スタジオ連携企画
            </p>
            <h1 className="text-2xl md:text-4xl font-bold! text-[#E48B00] leading-tight">
              あなたの写真がスタジオに！？
            </h1>
          </div>
        </header>

        <Section title="企画概要">
          <div className="max-w-2xl mx-auto space-y-2 text-lg">
            <p className="flex flex-wrap justify-center gap-x-2">
              <span>Magnezooは、</span>
              <span>生徒から募集した</span>
              <span>「ウチの子（ペット）」の</span>
              <span>写真をもとに制作する</span>
              <span>ネット企画です。</span>
            </p>
            <p className="font-bold text-[#E48B00] mt-4">
              今年はなんと、ライブスタジオと協力して
              <br className="hidden md:block" />
              最高に「かわいい」時間をお届けします！
            </p>
          </div>
        </Section>

        <Section title="写真の応募方法">
          <p className="mb-6 text-center">
            Magnezooに投稿された作品の中から、
            <br className="hidden md:block" />
            <span className="font-bold text-[#E48B00] text-lg">
              ライブスタジオの幕間企画として紹介させていただきます！
            </span>
          </p>

          <div className="grid gap-6 text-left max-w-xl mx-auto">
            <div className="flex gap-4">
              <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#E48B00] text-white font-bold">
                1
              </span>
              <div>
                <p className="font-bold">写真を撮る</p>
                <p className="text-sm text-gray-700">
                  ペット等の写真を高画質かつ正方形にカットしやすい構図で撮影してください。地域猫やカフェの動物も歓迎！
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#E48B00] text-white font-bold">
                2
              </span>
              <div>
                <p className="font-bold">投稿ボタンを押す</p>
                <p className="text-sm text-gray-700">
                  ページ下部の「投稿する」ボタンから、必要事項を入力してください。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#E48B00] text-white font-bold">
                3
              </span>
              <div>
                <p className="font-bold">完了！</p>
                <p className="text-sm text-gray-700">
                  選定された写真は、スタジオでの紹介が行われます。お楽しみに！
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="注意事項">
          <ul className="list-disc list-outside text-left mx-auto space-y-3 max-w-md">
            <li>
              応募は
              <span className="font-bold text-[#E48B00]">何回でもOK</span>
              です。
            </li>
            <li>
              写真はオリジナルのものに限ります。
              <ul className="list-[circle] ml-6 mt-2 space-y-1 text-gray-600">
                <li>人が大きく写り込んでいるものは避けてください。</li>
                <li>他のお客さんが写らないよう配慮をお願いします。</li>
              </ul>
            </li>
            <li>選ばれた写真は、紹介のために加工される場合があります。</li>
            <li>応募後の写真は返却できませんのでご了承ください。</li>
          </ul>
        </Section>

        <Section title="お問い合わせ">
          <div className="max-w-xl mx-auto text-left space-y-4 text-sm md:text-base">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-bold md:w-24">企画全般:</span>
              <span>
                Slackにて{" "}
                <code className="bg-gray-100 px-1 rounded">
                  @あかつきゆいと
                </code>{" "}
                /{" "}
                <code className="bg-gray-100 px-1 rounded">@おは._.ゆーし</code>{" "}
                まで
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-bold md:w-24">法的事項:</span>
              <MUILink
                href="/privacy"
                target="_blank"
                className="text-[#E48B00] underline"
              >
                プライバシー・ポリシーをご確認ください
              </MUILink>
            </div>
          </div>
        </Section>

        <div className="flex flex-col items-center py-10">
          <PostButton
            userId={session?.user?.id}
            isSalesApplication
            path="/studio"
            disabled={false} // 公開時はfalseに
            className="bg-white border-2 border-black text-black font-bold py-4 px-12 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 text-xl cursor-pointer"
          />
          <p className="mt-8 text-[#E48B00] text-xl md:text-2xl font-semibold! tracking-wider animate-bounce">
            みなさんのご応募をお待ちしております！
          </p>
        </div>
      </main>
    </div>
  );
}
