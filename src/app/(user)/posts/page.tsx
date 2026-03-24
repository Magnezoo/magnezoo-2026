import { Stack, Typography } from "@mui/material";

export default function PostsPage() {
  return (
    <Stack
      component={"main"}
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h1">投稿一覧</Typography>
    </Stack>
  );
}
