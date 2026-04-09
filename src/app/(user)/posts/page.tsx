import { Box, Stack, Typography } from "@mui/material";
import { headers } from "next/headers";

import { Suspense } from "react";
import PostFilterToggle from "@/components/Buttons/PostFilterToggle";
import PostListTitle from "@/components/Title/PostListTitle";
import { auth } from "@/lib/auth";
import ResolvedPostsPage from "./using";

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; pageSize?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUser = session?.user;

  return (
    <Stack
      component={"main"}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      py={10}
      px={2}
      spacing={5}
      sx={{
        backgroundColor: "#FFEECE",
      }}
    >
      <PostListTitle
        title="うちの子一覧"
        subtitle="気になる投稿を探してみよう！"
      />

      {currentUser && (
        <Box>
          <PostFilterToggle size="large" />
        </Box>
      )}

      <Suspense fallback={<Typography>Loading...</Typography>}>
        {/* Pass searchParams so the server component can paginate */}
        <ResolvedPostsPage searchParams={resolvedSearchParams} />
      </Suspense>
    </Stack>
  );
}
