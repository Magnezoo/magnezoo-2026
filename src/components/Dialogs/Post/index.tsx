import type { Post } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import PostDetailDialogClient from "./Client";

interface PostDetailDialogProps {
  type: "id" | "post";
  id?: string;
  post?: Post;
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
        });
  if (!post) {
    throw new Error("Post not found");
  }
  return (
    <PostDetailDialogClient
      id={post.id}
      post={post}
      closeRedirectTo={closeRedirectTo}
    />
  );
}
