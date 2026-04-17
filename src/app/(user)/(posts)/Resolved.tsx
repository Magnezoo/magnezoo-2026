import PostsList from "@/components/Lists/Post";
import prisma from "@/lib/prisma";

export async function ResolvedPickupPosts({
  currentUserId,
}: {
  currentUserId: string | null;
}) {
  const someMaximumNumber = await prisma.post.count();
  const takeCount = 3;
  const maxSkip = Math.max(0, someMaximumNumber - takeCount);
  const posts = await prisma.post.findMany({
    take: takeCount,
    skip: Math.floor(Math.random() * (maxSkip + 1)),
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
    orderBy: {
      createdAt: "desc",
    },
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
    where: {
      isStudio: {
        equals: false,
      },
    },
  });
  if (posts.length === 0) {
    return <div>投稿が見つかりませんでした。</div>;
  }
  return <PostsList posts={posts} currentUserId={currentUserId} />;
}
