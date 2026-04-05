import { Stack, Typography } from "@mui/material";
import { headers } from "next/headers";
import { forbidden, unauthorized } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import ResolvedPostsPage from "./using";

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; pageSize?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) unauthorized();
  if (session.user.role !== "admin") forbidden();
  return (
    <Stack
      component={"main"}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      py={10}
      px={2}
      spacing={5}
    >
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h3">物販用写真の選定</Typography>
        <Typography variant={"body1"}>物販用の写真を選びましょう</Typography>
      </Stack>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        {/* Pass searchParams so the server component can paginate */}
        <ResolvedPostsPage searchParams={resolvedSearchParams} />
      </Suspense>
    </Stack>
  );
}
