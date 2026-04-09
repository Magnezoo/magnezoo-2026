import { Box, Stack, Typography } from "@mui/material";
import { headers } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";
import PostFilterToggle from "@/components/Buttons/PostFilterToggle";
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

  const CharactorSize = 130;

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
      <Stack direction={"row"} alignItems="center" spacing={4}>
        <Image
          src="/img/char1.png"
          alt="Character 1"
          width={CharactorSize}
          height={CharactorSize}
        />
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h3" fontWeight={600}>
            うちの子一覧
          </Typography>
          <Typography variant={"body1"}>
            気になる投稿を探してみよう！
          </Typography>
        </Stack>
        <Image
          src="/img/char2.png"
          alt="Character 2"
          width={CharactorSize}
          height={CharactorSize}
        />
      </Stack>

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
