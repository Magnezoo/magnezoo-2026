import { Stack, Typography } from "@mui/material";
import SubscribersDataGrid from "@/components/admin/Datagrids/Subscribers";
import prisma from "@/lib/prisma";

export default async function SubscribersPage() {
  const subscribers = await prisma.eventStartSubscriber.findMany();

  return (
    <Stack spacing={2}>
      <Typography variant="h4">ユーザー管理</Typography>
      <Typography variant="body1">
        合計ユーザー数: {subscribers.length}
      </Typography>
      <SubscribersDataGrid rows={subscribers} />
    </Stack>
  );
}
