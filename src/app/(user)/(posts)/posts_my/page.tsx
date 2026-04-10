import { Box, Stack, Typography } from "@mui/material";
import { headers } from "next/headers";
import { Suspense } from "react";
import ResolvedPostsPage from "@/app/(user)/posts/using";
import PostFilterToggle from "@/components/Buttons/PostFilterToggle";
import PostListTitle from "@/components/Title/PostListTitle";
import { auth } from "@/lib/auth";

export default async function MyPostsPage({
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
        title="自分の投稿一覧"
        subtitle="自分が投稿した子たちです！"
      />

      {currentUser && (
        <Box>
          <PostFilterToggle size="large" />
        </Box>
      )}

      <Suspense fallback={<Typography>Loading...</Typography>}>
        <ResolvedPostsPage
          searchParams={resolvedSearchParams}
          filterByCurrentUser
        />
      </Suspense>
    </Stack>
  );
}
