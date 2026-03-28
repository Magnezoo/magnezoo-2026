import { Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import ResolvedPostsPage from "./using";

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; pageSize?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
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
        {/* Pass searchParams so the server component can paginate */}
        <ResolvedPostsPage searchParams={resolvedSearchParams} />
      </Suspense>
    </Stack>
  );
}
