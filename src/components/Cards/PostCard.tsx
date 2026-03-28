import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import type { Post, Slacks, User } from "@/generated/prisma/client";
import VoteButton from "../Buttons/Vote";

export default function PostCard({
  post,
  currentUserId,
  index,
}: {
  post: {
    author: User & {
      slacks: Omit<Slacks, "userId" | "id" | "createdAt" | "updatedAt">[];
    };
    votes: { userId: string }[];
  } & Post;
  currentUserId: string | null;
  index?: number;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 300,
        marginBottom: 2,
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
            <Typography variant="h5">{post.title}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar
                src={post.author.image || undefined}
                sx={{
                  width: 24,
                  height: 24,
                }}
              >
                {post.author.nickName?.charAt(0) ||
                  (post.author.slacks[0].isDisplayname
                    ? post.author.slacks[0].name.charAt(0)
                    : null)}
              </Avatar>
              <Typography variant="subtitle2" color="text.secondary">
                {post.author.name ||
                  (post.author.slacks[0].isDisplayname
                    ? post.author.slacks[0].name
                    : "匿名")}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {post.description.length > 30
                ? `${post.description.slice(0, 30)}...`
                : post.description}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{ p: 1.5 }}>
          <VoteButton
            postId={post.id}
            currentVoteCount={post.votes.length}
            isVoted={post.votes.some((vote) => vote.userId === currentUserId)}
            disabled={!currentUserId}
          />
        </CardActions>
      </Box>
    </Card>
  );
}
