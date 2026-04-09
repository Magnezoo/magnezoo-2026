import { Grid } from "@mui/material";
import { headers } from "next/headers";
import PostCard, {
  type PostWithAutherAndVotes,
} from "@/components/Cards/PostCard";
import { auth } from "@/lib/auth";

export default async function PostsList({
  posts,
  currentUserId,
  isSalesApplicationVoting = false,
}: {
  posts: PostWithAutherAndVotes[];
  currentUserId: string | null;
  isSalesApplicationVoting?: boolean;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      columns={6}
      sx={{ width: "100%" }}
      maxWidth={{ xs: "100%", md: "1400px" }}
    >
      {posts.map((post, index) => (
        <PostCard
          post={post}
          key={post.id}
          index={index}
          currentUserId={currentUserId}
          isSalesApplicationVoting={isSalesApplicationVoting}
          isAdmin={session?.user.role === "admin" || false}
        />
      ))}
    </Grid>
  );
}
