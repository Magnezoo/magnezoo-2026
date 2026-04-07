"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import VoteButton from "@/components/Buttons/Vote";
import AuthorCard from "@/components/Cards/AuthorCard";
import type { PostWithAutherAndVotes } from "@/components/Cards/PostCard";
import type { Tags, TagsPosts } from "@/generated/prisma/client";

export enum PostFormStep {
  TitleAndDescription = 1,
  ImageUpload = 2,
  PublicationSettings = 3,
}

export interface PostDetailData extends PostWithAutherAndVotes {
  tags: ({ tag: Tags } & TagsPosts)[];
}

interface Props {
  id: string;
  post: PostDetailData;
  closeRedirectTo?: string;
  currentUserId?: string | null;
}

export default function PostDetailDialogClient(props: Props) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  return (
    <Stack
      spacing={2}
      justifyContent="start"
      alignItems="center"
      width="100%"
      position="fixed"
      top={0}
      left={0}
      zIndex={900}
      onClick={handleClose}
      height="100%"
      sx={{ p: { xs: 2, md: 10 }, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Stack
        spacing={2}
        sx={{
          width: {
            xs: "100%",
            sm: "720px",
            md: "1000px",
            lg: "1400px",
            xl: "1835px",
          },
          maxWidth: "100%",
          height: { xs: "auto", md: "80vh", xl: "815px" },
          borderRadius: 2,
          m: { xs: 1, md: 4 },
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "nowrap",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={props.post.imageUrl!}
          alt={props.post.title}
          width={400}
          height={300}
          style={{
            overflow: "hidden",
            width: "auto",
            maxWidth: "1300px",
            height: "100%",
            borderRadius: 8,
          }}
        />
        <Stack
          direction={{ xs: "column", md: "row" }}
          py={{ xs: 6, xl: 12 }}
          gap={4}
          flex={1}
          sx={{
            position: "relative",
            overflowY: { xs: "auto", md: "visible" },
            maxHeight: { xs: "calc(100vh - 80px)", md: "none" },
          }}
        >
          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
            <IconButton
              onClick={handleClose}
              aria-label="閉じる"
              color="primary"
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack
            spacing={1}
            flex={1}
            mr={5}
            ml={3}
            sx={{
              overflowY: { xs: "auto", md: "auto" },
              maxHeight: { xs: "calc(100vh - 160px)", md: "none" },
            }}
          >
            <Typography variant="h4">{props.post.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {props.post.createdAt
                ? new Date(props.post.createdAt).toLocaleString()
                : ""}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {props.post.tags.map((tag) => (
                <Chip key={tag.tag.id} label={tag.tag.name} size={"small"} />
              ))}
            </Stack>
            <AuthorCard user={props.post.author} avatarSize={32} />
            <VoteButton
              postId={props.post.id}
              currentVoteCount={props.post.votes.length}
              isVoted={props.post.votes.some(
                (v) =>
                  v.userId === props.currentUserId && !v.isSalesApplication,
              )}
              currentUserId={props.currentUserId || null}
              disabled={!props.currentUserId}
            />
            <Typography variant="h6" component={"p"} color="text.secondary">
              {props.post.description}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
