import { Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import ResolvedPostsPage from "./using";

export default function PostsPage() {
  return (
    <Stack
      component={"main"}
      alignItems="center"
      justifyContent="center"
      height="100vh"
      spacing={4}
    >
      <Typography variant="h3">投稿一覧</Typography>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <ResolvedPostsPage />
      </Suspense>
    </Stack>
  );
}
