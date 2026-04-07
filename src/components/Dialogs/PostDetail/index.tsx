import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import PostDetailDialogClient, { type PostDetailData } from "./Client";

interface PostDetailDialogProps {
  type: "id" | "post";
  id?: string;
  post?: PostDetailData;
  closeRedirectTo?: string;
}

export default async function PostDetailDialog(props: PostDetailDialogProps) {
  const { type, closeRedirectTo } = props;
  if (type === "id" && !props.id) {
    throw new Error("ID is required when type is 'id'");
  }
  if (type === "post" && !props.post) {
    throw new Error("Post data is required when type is 'post'");
  }
  const post =
    type === "post"
      ? props.post
      : await prisma.post.findUnique({
          // biome-ignore lint/style/noNonNullAssertion: 上でnullチェックをしているため
          where: { id: props.id! },
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
              select: {
                userId: true,
                salesType: true,
                isSalesApplication: true,
              },
            },
            tags: {
              include: {
                tag: true,
              },
            },
          },
        });
  if (!post) {
    throw new Error("Post not found");
  }
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <PostDetailDialogClient
      id={post.id}
      post={post}
      closeRedirectTo={closeRedirectTo}
      currentUserId={session?.user.id}
    />
  );
}
