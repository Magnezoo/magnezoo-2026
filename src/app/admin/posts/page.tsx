import { Button, Stack, Typography } from "@mui/material";
import PostsDatagrid from "@/components/admin/Datagrids/Post";
import prisma from "@/lib/prisma";

export default async function PostsPage() {
  const posts = await prisma.post.findMany();
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "start", sm: "center" }}
        justifyContent="space-between"
        gap={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          投稿管理
        </Typography>
        <Button variant="contained" href="/admin/posts/new">
          新規投稿を作成
        </Button>
      </Stack>
      <PostsDatagrid rows={posts} />
    </Stack>
  );
}
