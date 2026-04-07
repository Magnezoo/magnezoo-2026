import { headers } from "next/headers";
import { use } from "react";
import { Typography } from "@mui/material";
import Pagination from "@/components/Buttons/Pagenation";
import PostsList from "@/components/Lists/Post";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type Props = {
  searchParams?: { page?: string; pageSize?: string };
  filterByCurrentUser?: boolean;
};

export default function ResolvedPostsPage({
  searchParams,
  filterByCurrentUser,
}: Props) {
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const pageSize = Math.max(
    1,
    Math.min(50, parseInt(searchParams?.pageSize || "10", 10) || 10),
  );

  const headerStore = use(headers());
  const session = use(auth.api.getSession({ headers: headerStore }));
  const currentUser = session?.user;

  if (filterByCurrentUser && !currentUser) {
    return (
      <Typography variant="body1" sx={{ mt: 5 }}>
        ログインが必要です
      </Typography>
    );
  }

  const where =
    filterByCurrentUser && currentUser ? { authorId: currentUser.id } : {};

  const count = use(prisma.post.count({ where }));

  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const currentPage = Math.min(page, totalPages);

  const posts = use(
    prisma.post.findMany({
      where,
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
            isSalesApplication: false,
          },
          select: { userId: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    }),
  );

  return (
    <>
      {posts.length > 0 ? (
        <>
          <PostsList posts={posts} currentUserId={currentUser?.id || null} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 5 }}>
          {filterByCurrentUser
            ? "あなたは投稿していないようです"
            : "表示する投稿がありません"}
        </Typography>
      )}
    </>
  );
}
