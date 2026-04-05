import { Button, Stack, Typography } from "@mui/material";
import UsersDatagrid from "@/components/admin/Datagrids/User";
import prisma from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <Stack spacing={2}>
      <Typography variant="h4">ユーザー管理</Typography>
      <Typography variant="body1">合計ユーザー数: {users.length}</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" href="/admin/users/new">
          新規ユーザー作成
        </Button>
      </Stack>
      <UsersDatagrid rows={users} />
    </Stack>
  );
}
