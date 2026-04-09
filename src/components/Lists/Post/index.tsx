import { Grid } from "@mui/material";
import PostCard, {
  type PostWithAutherAndVotes,
} from "@/components/Cards/PostCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
    <Grid container spacing={2} justifyContent="center" columns={3}>
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
