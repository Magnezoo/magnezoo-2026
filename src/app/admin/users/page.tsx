import UsersDatagrid from "@/components/admin/Datagrids/Users";
import prisma from "@/lib/prisma";
import { Stack, Typography } from "@mui/material";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <Stack spacing={2}>
      <Typography variant="h4">ユーザー管理</Typography>
      <Typography variant="body1">合計ユーザー数: {users.length}</Typography>
      <UsersDatagrid rows={users} />
    </Stack>
  );
}
