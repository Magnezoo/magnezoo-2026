import { Grid } from "@mui/material";
import PostCard, {
  type PostWithAutherAndVotes,
} from "@/components/Cards/PostCard";

export default function PostsList({
  posts,
  currentUserId,
}: {
  posts: PostWithAutherAndVotes[];
  currentUserId: string | null;
}) {
  return (
    <Grid container spacing={2} justifyContent="center" columns={3}>
      {posts.map((post, index) => (
        <PostCard
          post={post}
          key={post.id}
          index={index}
          currentUserId={currentUserId}
        />
      ))}
    </Grid>
  );
}
