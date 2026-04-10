import { Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import PostDetailDialog from "@/components/Dialogs/PostDetail";
import prisma from "@/lib/prisma";
import ResolvedPostsPage from "../using";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      title: true,
      description: true,
      imageUrl: true,
      tags: {
        select: { tag: { select: { name: true } } },
      },
      author: {
        select: {
          slacks: {
            select: { name: true, isDisplayname: true },
          },
          nickName: true,
        },
      },
      createdAt: true,
    },
  });
  if (!post) {
    return {
      title: "投稿が見つかりませんでした",
      description: `投稿ID: ${id}の詳細ページは存在しません。`,
    };
  }
  const header = await headers();
  const protocol = header.get("x-forwarded-proto") || "http";
  const host =
    header.get("host") || header.get("x-forwarded-host") || "localhost:3000";
  const tags = post.tags.map((t) => t.tag.name);
  const authorName =
    post.author.nickName ||
    post.author.slacks.find((s) => s.isDisplayname)?.name ||
    post.author.slacks[0]?.name ||
    "匿名ユーザー";
  return {
    title: `${post.title}`,
    description: `${post.description.slice(0, 100)}...`,
    openGraph: {
      title: `${post.title}`,
      description: `${post.description.slice(0, 100)}...`,
      images: `${protocol}://${host}${post.imageUrl}`,
      type: "article",
      tags,
      authors: [authorName],
      publishedTime: post.createdAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title}`,
      description: `${post.description.slice(0, 100)}...`,
      images: `${protocol}://${host}${post.imageUrl}`,
    },
  };
}

export default async function PostDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <Stack
        component={"main"}
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        py={10}
        px={2}
        spacing={5}
        sx={{
          backgroundColor: "#FFEECE",
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h3">うちの子一覧</Typography>
          <Typography variant={"body1"}>
            気になる投稿を探してみよう！
          </Typography>
        </Stack>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {/* Pass searchParams so the server component can paginate */}
          <ResolvedPostsPage searchParams={resolvedSearchParams} />
        </Suspense>
      </Stack>
      <PostDetailDialog type="id" id={id} closeRedirectTo="/posts" />
    </>
  );
}
