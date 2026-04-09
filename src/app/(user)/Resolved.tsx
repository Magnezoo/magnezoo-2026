import PostsList from "@/components/Lists/Post";
import prisma from "@/lib/prisma";

export async function ResolvedPickupPosts({
  currentUserId,
}: {
  currentUserId: string | null;
}) {
  const someMaximumNumber = await prisma.post.count();
  const posts = await prisma.post.findMany({
    take: 3,
    skip: Math.floor(Math.random() * someMaximumNumber),
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
  });
  if (posts.length === 0) {
    return <div>投稿が見つかりませんでした。</div>;
  }
  return <PostsList posts={posts} currentUserId={currentUserId} />;
}

export async function ResolvedRecentPosts({
  currentUserId,
}: {
  currentUserId: string | null;
}) {
  const posts = await prisma.post.findMany({
    take: 12,
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
  });
  if (posts.length === 0) {
    return <div>投稿が見つかりませんでした。</div>;
  }
  return <PostsList posts={posts} currentUserId={currentUserId} />;
}
