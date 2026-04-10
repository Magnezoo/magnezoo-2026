import { headers } from "next/headers";
import { forbidden, notFound, unauthorized } from "next/navigation";
import { auth } from "@/lib/auth";
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

  if (!post) notFound();

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) unauthorized();
  if (session.user.id !== post.authorId) forbidden();

  return <PostEditForm post={post} />;
}
