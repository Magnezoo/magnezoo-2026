import { headers } from "next/headers";
import { use } from "react";
import Pagination from "@/components/Buttons/Pagenation";
import PostsList from "@/components/Lists/Post";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type Props = { searchParams?: { page?: string; pageSize?: string } };

export default function ResolvedPostsPage({ searchParams }: Props) {
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const pageSize = Math.max(
    1,
    parseInt(searchParams?.pageSize || "10", 10) || 10,
  );

  const headerStore = use(headers());
  const session = use(auth.api.getSession({ headers: headerStore }));
  const currentUser = session?.user;

  const count = use(prisma.post.count());

  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const currentPage = Math.min(page, totalPages);

  const posts = use(
    prisma.post.findMany({
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
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    }),
  );

  return (
    <>
      <PostsList
        posts={posts}
        currentUserId={currentUser?.id || null}
        isSalesApplicationVoting
      />

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
