"use client";

import {
  Box,
  Button,
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
import { useRouter } from "next/navigation";
import {
  type Post,
  SalesType,
  type Slacks,
  type User,
} from "@/generated/prisma/browser";
import VoteButton from "../Buttons/Vote";
import AuthorCard from "./AuthorCard";

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
  isAdmin = false,
}: {
  post: PostWithAutherAndVotes;
  currentUserId: string | null;
  index?: number;
  isSalesApplicationVoting?: boolean;
  isAdmin?: boolean;
}) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

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
      size={{ xs: 6, md: 4, lg: 2 }}
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
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16 / 9", // カードの見た目を固定
              position: "relative",
              overflow: "hidden", // はみ出し防止
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              style={{
                objectFit: "cover", // ← これが超重要
              }}
              sizes="(max-width: 768px) 100vw, 450px"
              fetchPriority={index !== undefined && index < 5 ? "high" : "auto"}
              loading={index !== undefined && index < 5 ? "eager" : "lazy"}
            />
          </Box>

          <CardContent sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={600}>
                {optimizedTitle}
              </Typography>

              <AuthorCard user={post.author} />

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
              <Stack
                direction="row"
                alignItems="center"
                width={"100%"}
                spacing={1}
                justifyContent={"space-between"}
              >
                <VoteButton
                  postId={post.id}
                  currentVoteCount={post.votes.length}
                  isVoted={post.votes.some(
                    (v) => v.userId === currentUserId && !v.isSalesApplication,
                  )}
                  currentUserId={currentUserId}
                  disabled={!currentUserId}
                />
                <Stack direction="row" spacing={1}>
                  {isAdmin && (
                    <Button href={`/admin/posts/${post.id}`}>管理画面へ</Button>
                  )}
                  {!isAdmin && currentUserId === post.author.id && (
                    <Button href={`/posts/${post.id}/edit`}>編集する</Button>
                  )}
                  <Button onClick={() => router.push(`/posts/${post.id}`)}>
                    詳細を見る
                  </Button>
                </Stack>
              </Stack>
            )}
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
}
