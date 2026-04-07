import { Dialog, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import ResolvedPostsPage from "../using";

export default async function PostDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <>
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
          <Typography variant="h3">うちの子一覧</Typography>
          <Typography variant={"body1"}>
            気になる投稿を探してみよう！
          </Typography>
        </Stack>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          {/* Pass searchParams so the server component can paginate */}
          <ResolvedPostsPage searchParams={resolvedSearchParams} />
        </Suspense>
      </Stack>
      <Dialog open={true} maxWidth="sm" fullWidth>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Post ID: {id}</h2>
          <p>
            This is a modal for post details. Implement the details view here.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Close
          </button>
        </div>
      </Dialog>
    </>
  );
}
