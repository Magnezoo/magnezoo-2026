import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PostEditForm from "./PostEditForm";

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!post) return notFound();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return <PostEditForm post={post} users={users} />;
}
