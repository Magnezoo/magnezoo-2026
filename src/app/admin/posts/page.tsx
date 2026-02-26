import { Stack, Typography } from "@mui/material";
import PostsDatagrid from "@/components/admin/Datagrids/Post";
import prisma from "@/lib/prisma";

export default async function PostsPage() {
  const posts = await prisma.post.findMany();
  return (
    <Stack>
      <Typography variant="h4" component="h1" gutterBottom>
        投稿管理
      </Typography>
      <PostsDatagrid rows={posts} />
    </Stack>
  );
}
