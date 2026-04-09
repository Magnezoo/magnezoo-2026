import { Box, Stack, Typography } from "@mui/material";
import { headers } from "next/headers";
import { Suspense } from "react";
import PostFilterToggle from "@/components/Buttons/PostFilterToggle";
import { auth } from "@/lib/auth";
import ResolvedPostsPage from "../../../posts/using";

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
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h3">自分の投稿一覧</Typography>
        <Typography variant={"body1"}>自分が投稿した子たちです！</Typography>
      </Stack>

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
