import { Avatar, Stack, Typography } from "@mui/material";
import type { User } from "@/generated/prisma/client";

export default function AuthorCard({
  user,
  avatarSize = 24,
}: {
  user: User & { slacks: { name: string; isDisplayname: boolean }[] };
  avatarSize?: number;
}) {
  const displaySlack = user.slacks?.find((slack) => slack.isDisplayname);
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar
        src={user.image || undefined}
        sx={{ width: avatarSize, height: avatarSize }}
      >
        {user.nickName?.[0] ??
          (displaySlack?.isDisplayname ? displaySlack.name[0] : "?")}
      </Avatar>

      <Typography variant="subtitle2" color="text.secondary" fontWeight={"600"}>
        {user.nickName ??
          (displaySlack?.isDisplayname ? displaySlack.name : "匿名")}
      </Typography>
    </Stack>
  );
}
