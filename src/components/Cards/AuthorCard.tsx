import { Avatar, Stack, Typography } from "@mui/material";
import type { User } from "@/generated/prisma/client";

export default function AuthorCard({
  user,
  avatarSize = 24,
}: {
  user: User & { slacks: { name: string; isDisplayname: boolean }[] };
  avatarSize?: number;
}) {
  const firstSlack = user.slacks?.[0];
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar
        src={user.image || undefined}
        sx={{ width: avatarSize, height: avatarSize }}
      >
        {user.nickName?.[0] ??
          (firstSlack?.isDisplayname ? firstSlack.name[0] : "?")}
      </Avatar>

      <Typography variant="subtitle2" color="text.secondary">
        {user.nickName ??
          (firstSlack?.isDisplayname ? firstSlack.name : "匿名")}
      </Typography>
    </Stack>
  );
}
