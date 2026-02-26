import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return notFound();
  const user = await prisma.user.findUnique({ where: { id: post.authorId } });

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        {post.title}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary">
        作成: {new Date(post.createdAt).toLocaleString()} ・ 更新:{" "}
        {new Date(post.updatedAt).toLocaleString()}
      </Typography>

      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
        {post.description}
      </Typography>

      {post.imageUrl ? (
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={450}
          style={{ maxWidth: 800, width: "100%", borderRadius: 8 }}
        />
      ) : null}

      <Typography variant="body2" color="text.secondary">
        投稿者:{" "}
        <Link
          href={`/admin/users/${user?.id}`}
          style={{ textDecoration: "underline" }}
        >
          {user?.name ?? user?.email}
        </Link>
      </Typography>

      <Stack direction="row" spacing={1}>
        <Link href="/admin/posts">
          <Button variant="outlined">一覧へ</Button>
        </Link>
        <Link href={`/admin/posts/${post.id}/edit`}>
          <Button variant="contained">編集</Button>
        </Link>
      </Stack>
    </Stack>
  );
}
