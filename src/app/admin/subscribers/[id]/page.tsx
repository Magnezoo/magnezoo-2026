import prisma from "@/lib/prisma";
import { Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return notFound();
  const slack = await prisma.slacks.findUnique({
    where: { userId: user.id },
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        {user.name ?? user.email}
      </Typography>
      {slack && (
        <Typography variant="body2" color="text.secondary">
          Slack: {slack.name}
        </Typography>
      )}

      <Typography variant="subtitle2" color="text.secondary">
        作成: {new Date(user.createdAt).toLocaleString()} ・ 更新:{" "}
        {new Date(user.updatedAt).toLocaleString()}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Link href="/admin/users">
          <Button variant="outlined">一覧へ</Button>
        </Link>
        <Link href={`/admin/users/${user.id}/edit`}>
          <Button variant="contained">編集</Button>
        </Link>
      </Stack>
    </Stack>
  );
}
