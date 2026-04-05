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
} from "@mui/material";
import Image from "next/image";
import {
  type Post,
  SalesType,
  type Slacks,
  type User,
} from "@/generated/prisma/client";
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
  const firstSlack =
    post.author.slacks && post.author.slacks.length > 0
      ? post.author.slacks[0]
      : undefined;
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const windowSizePrefix =
    windowWidth >= 1200 ? "large" : windowWidth >= 900 ? "medium" : "small";
  const optimizedDescription =
    windowSizePrefix === "small"
      ? post.description.length > 30
        ? `${post.description.slice(0, 30)}...`
        : post.description
      : post.description.length > 59
        ? `${post.description.slice(0, 58)}...`
        : post.description;
  const optimizedTitle =
    windowSizePrefix === "small"
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
          marginBottom: 2,
          minHeight: { md: 455 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={300}
            style={{
              width: "100%",
              aspectRatio: "16/9",
            }}
            fetchPriority={index !== undefined && index < 5 ? "high" : "auto"}
            loading={index !== undefined && index < 5 ? "eager" : "lazy"}
            preload={index !== undefined && index < 5}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <Typography variant="h5">{optimizedTitle}</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  src={post.author.image || undefined}
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                >
                  {post.author.nickName?.charAt(0) ||
                    (firstSlack?.isDisplayname
                      ? firstSlack.name.charAt(0)
                      : null)}
                </Avatar>
                <Typography variant="subtitle2" color="text.secondary">
                  {post.author.nickName ||
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
              Object.values(SalesType).map((type) => (
                <>
                  {type === SalesType.ACRIL_KEYCHAIN ? (
                    <Typography
                      key={`${type}-label`}
                      variant="body2"
                      color="gray"
                      sx={{ minWidth: 80 }}
                    >
                      アクリルキーホルダー
                    </Typography>
                  ) : type === SalesType.BADGE ? (
                    <Typography
                      key={`${type}-label`}
                      variant="body2"
                      color="gray"
                      sx={{ minWidth: 80 }}
                    >
                      バッジ
                    </Typography>
                  ) : (
                    type === SalesType.STICKER && (
                      <Typography
                        key={`${type}-label`}
                        variant="body2"
                        color="gray"
                        sx={{ minWidth: 80 }}
                      >
                        キーホルダー
                      </Typography>
                    )
                  )}
                  <VoteButton
                    key={type}
                    postId={post.id}
                    currentVoteCount={post.votes.length}
                    isVoted={post.votes.some(
                      (vote) => vote.userId === currentUserId,
                    )}
                    currentUserId={currentUserId}
                    disabled={!currentUserId}
                    isSalesApplication={isSalesApplicationVoting}
                    salesType={type}
                  />
                </>
              ))
            ) : (
              <VoteButton
                postId={post.id}
                currentVoteCount={post.votes.length}
                isVoted={post.votes.some(
                  (vote) => vote.userId === currentUserId,
                )}
                currentUserId={currentUserId}
                disabled={!currentUserId}
                isSalesApplication={isSalesApplicationVoting}
              />
            )}
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
}
