import { Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { forbidden } from "next/navigation";
import PostsList from "@/components/Lists/Post";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "スタジオ幕間VTR コンテスト企画〜ペット部門〜 - Magnezoo × 磁石祭2026",
  description:
    "Magnezooは、生徒から募集した「ウチの子（ペット）」の写真をもとに制作するネット企画です。ライブスタジオと協力して最高に「かわいい」時間をお届けします！",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 group">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-[#E48B00]/10 px-6 py-10 md:px-12 md:py-12 text-black shadow-lg transition-all duration-300 hover:border-[#E48B00]/30">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold! text-[#E48B00] relative">
            {title}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#E48B00] rounded-full"></span>
          </h2>
        </div>
        <div className="text-center leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

export default async function SalesAppCampainPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (
    session?.user.role !== "admin" &&
    process.env.NODE_ENV !== "development"
  ) {
    forbidden();
  }

  const posts = await prisma.post.findMany({
    include: {
      author: {
        include: {
          slacks: {
            select: { name: true, isDisplayname: true },
          },
        },
      },
      votes: {
        where: {
          isSalesApplication: true,
        },
        select: { userId: true, salesType: true, isSalesApplication: true },
      },
    },
    orderBy: { studioMgmtNo: "asc" },
    where: {
      isStudio: {
        equals: true,
      },
      studioMgmtNo: {
        not: null,
      },
    },
  });

  const maxWidth = 1400;
  const paddinX = 2;
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#FFEECE] font-sans text-slate-900 py-12 md:py-20 overflow-x-hidden">
      {/* 幾何学的な背景アニメーション（既存のCSSクラスを想定） */}
      <div className="animated-bg-circles" aria-hidden="true">
        <div className="circle circle1 opacity-50" />
        <div className="circle circle2 opacity-50" />
        <div className="circle circle3 opacity-50" />
      </div>

      <main className="relative w-full max-w-350 mx-auto px-6 z-10 ">
        <div className="max-w-4xl w-full mx-auto">
          <header className="mb-12 text-center">
            <div className="bg-white/95 rounded-4xl border-2 border-[#E48B00]/20 p-8 md:p-12 shadow-xl ring-8 ring-[#FFEECE]">
              <span className="inline-block bg-[#E48B00] text-white text-sm md:text-base font-bold! px-4 py-1 rounded-full mb-4">
                スタジオ連携企画
              </span>
              <h1 className="text-3xl md:text-5xl font-black! text-[#E48B00] tracking-tight leading-tight">
                スタジオ幕間VTR
                <br />
                <span className="text-2xl md:text-4xl">
                  コンテスト企画 〜ペット部門〜
                </span>
              </h1>
            </div>
          </header>

          <Section title="企画概要">
            <div className="max-w-2xl mx-auto space-y-6 text-base md:text-lg">
              <p className="font-medium!">
                スタジオ番組の幕間VTRで、N高グループ関係者から応募された
                <br className="hidden md:block" />
                フォトコンテストを実施します！
              </p>
              <p>
                ペット部門では、可愛すぎて思わず自慢したくなる
                <br className="hidden md:block" />
                <span className="text-[#E48B00] font-bold! text-xl">
                  「うちの子」
                </span>
                が続々登場！
              </p>
              <p className="bg-[#FFEECE]/50 p-4 rounded-xl">
                栄えあるNo.1に輝く作品は、
                <br />
                <span className="font-bold! border-b-2 border-[#E48B00]">
                  視聴者の皆さんの投票
                </span>
                で決まります 👀
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="https://forms.gle/8NuR57dDeUKrGCfq8"
                target="_blank"
                className="inline-block bg-white border-2 md:border-[3px] border-black text-black font-black!
               py-3 px-8 text-lg 
               md:py-5 md:px-16 md:text-2xl 
               rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
               md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
               hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 
               md:hover:translate-x-1 md:hover:translate-y-1 
               transition-all duration-200"
              >
                投票する 🐾
              </Link>
            </div>
          </Section>

          <Section title="注意事項">
            <div className="inline-block text-left bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <ul className="list-disc list-outside ml-5 space-y-4 max-w-md">
                <li className="font-semibold! text-red-600">
                  フォームへの回答は
                  <span className="underline decoration-2 font-semibold!">
                    お一人様一回まで
                  </span>
                  となります。
                </li>
                <li className="text-gray-700">
                  他の部門（企画）も同じフォームから投票いただけます。ぜひ併せてご覧ください！
                </li>
              </ul>
            </div>
          </Section>

          <Section title="お問い合わせ">
            <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl text-left border border-gray-200">
              <div className="flex flex-col md:flex-row gap-3 items-start">
                <span className="font-bold! text-[#E48B00] shrink-0">
                  企画全般 :
                </span>
                <div className="space-y-2">
                  <p className="text-sm md:text-base">
                    Slackにて下記チャンネルまたはメンションまで
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <code className="bg-white border border-gray-300 px-2 py-1 rounded text-sm font-mono text-pink-600">
                      #磁石祭2026_問い合わせ
                    </code>
                    <code className="bg-white border border-gray-300 px-2 py-1 rounded text-sm font-mono text-blue-600">
                      @magfes_staff-studio
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <Stack id="pickup" width={"100%"} maxWidth={maxWidth} px={paddinX}>
          <Typography
            variant="h4"
            align="left"
            mt={10}
            mb={5}
            fontWeight="bold"
          >
            エントリー一覧
          </Typography>
          <PostsList posts={posts} currentUserId={session?.user.id || null} />
        </Stack>

        <div className="flex flex-col items-center py-10">
          <Link
            href="https://forms.gle/8NuR57dDeUKrGCfq8"
            target="_blank"
            className="group relative bg-white border-2 md:border-[3px] border-black text-black font-black!
               py-4 px-10 text-xl 
               md:py-6 md:px-20 md:text-3xl 
               rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
               md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
               hover:shadow-none hover:translate-x-1 hover:translate-y-1 
               transition-all duration-200"
          >
            投票はこちらから
          </Link>
          <p className="mt-8 text-[#E48B00] text-lg md:text-2xl font-black! tracking-widest animate-bounce text-center">
            ＼ あなたの一票をお待ちしています！ ／
          </p>
        </div>
      </main>
    </div>
  );
}
