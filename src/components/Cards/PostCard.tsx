"use client";

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import {
  type Post,
  SalesType,
  type Slacks,
  type User,
} from "@/generated/prisma/browser";
import VoteButton from "../Buttons/Vote";

export interface UserWithSlacks extends User {
  slacks: Omit<Slacks, "userId" | "id" | "createdAt" | "updatedAt">[];
}

export interface PostWithAutherAndVotes extends Post {
  author: UserWithSlacks;
  votes: {
    userId: string;
    isSalesApplication?: boolean;
    salesType?: SalesType | null;
  }[];
}

// ラベルはマップ管理
const salesTypeLabels: Record<SalesType, string> = {
  NONE: "なし",
  ACRYLIC_KEYCHAIN: "アクリルキーホルダー",
  BADGE: "バッジ",
  STICKER: "ステッカー",
};

export default function PostCard({
  post,
  currentUserId,
  index,
  isSalesApplicationVoting = false,
}: {
  post: PostWithAutherAndVotes;
  currentUserId: string | null;
  index?: number;
  isSalesApplicationVoting?: boolean;
}) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const firstSlack = post.author.slacks?.[0];

  // 最適化（SSR安全）
  const optimizedDescription = isSmall
    ? post.description.length > 30
      ? `${post.description.slice(0, 30)}...`
      : post.description
    : post.description.length > 59
      ? `${post.description.slice(0, 58)}...`
      : post.description;

  const optimizedTitle = isSmall
    ? post.title.length > 20
      ? `${post.title.slice(0, 20)}...`
      : post.title
    : post.title.length > 34
      ? `${post.title.slice(0, 33)}...`
      : post.title;

  return (
    <Grid
      size={{ xs: 3, md: 1 }}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 450,
          mb: 2,
          minHeight: { md: 455 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={300}
            style={{ width: "100%", aspectRatio: "16/9" }}
            fetchPriority={index !== undefined && index < 5 ? "high" : "auto"}
            loading={index !== undefined && index < 5 ? "eager" : "lazy"}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <Typography variant="h5">{optimizedTitle}</Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  src={post.author.image || undefined}
                  sx={{ width: 24, height: 24 }}
                >
                  {post.author.nickName?.[0] ??
                    (firstSlack?.isDisplayname ? firstSlack.name[0] : "?")}
                </Avatar>

                <Typography variant="subtitle2" color="text.secondary">
                  {post.author.nickName ??
                    (firstSlack?.isDisplayname ? firstSlack.name : "匿名")}
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                {optimizedDescription}
              </Typography>
            </Stack>
          </CardContent>

          <CardActions sx={{ p: 1.5 }}>
            {isSalesApplicationVoting ? (
              <Stack spacing={1}>
                {Object.values(SalesType).map((type) => {
                  if (type === SalesType.NONE) return null;

                  const votes = post.votes.filter(
                    (v) => v.isSalesApplication && v.salesType === type,
                  );

                  const isVoted = votes.some(
                    (v) => v.userId === currentUserId && v.salesType === type,
                  );

                  return (
                    <Stack
                      key={type}
                      direction="row"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Typography
                        variant="body2"
                        color="gray"
                        sx={{ width: 200 }}
                      >
                        {salesTypeLabels[type]}
                      </Typography>

                      <VoteButton
                        postId={post.id}
                        currentVoteCount={votes.length}
                        isVoted={isVoted}
                        currentUserId={currentUserId}
                        disabled={!currentUserId}
                        isSalesApplication
                        salesType={type}
                      />
                    </Stack>
                  );
                })}
              </Stack>
            ) : (
              <VoteButton
                postId={post.id}
                currentVoteCount={post.votes.length}
                isVoted={post.votes.some(
                  (v) => v.userId === currentUserId && !v.isSalesApplication,
                )}
                currentUserId={currentUserId}
                disabled={!currentUserId}
              />
            )}
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
}
