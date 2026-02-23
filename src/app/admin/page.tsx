import { Stack, Typography } from "@mui/material";

export default function AdminPage() {
  return (
    <Stack>
      <Typography variant="h4" component="h1" gutterBottom>
        管理者ダッシュボード
      </Typography>
      <Typography variant="body1">
        ここでは、サイト全体の管理を行うことができます。
      </Typography>
      <Typography variant="body1">
        左側のメニューから、投稿の管理やユーザーの管理などを行ってください。
      </Typography>
    </Stack>
  );
}
