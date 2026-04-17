"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VoteButton from "@/components/Buttons/Vote";
import AuthorCard from "@/components/Cards/AuthorCard";
import type { PostWithAutherAndVotes } from "@/components/Cards/PostCard";
import type { Tags, TagsPosts } from "@/generated/prisma/client";

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
    if (props.closeRedirectTo) {
      router.push(props.closeRedirectTo);
    } else {
      router.back();
    }
  };

  const [openLightbox, setOpenLightbox] = useState(false);

  return (
    <Box
      onClick={handleClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 900,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 1, md: 4 },
        overflowY: "scroll",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "720px",
            md: "1000px",
            lg: "95vw",
          },
          mt: { xs: 20, md: 5 },
          height: { xs: "auto", md: "85vh" },
          backgroundColor: "#fff",
          borderRadius: { xs: 0, md: 2 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            handleClose();
          }
        }}
      >
        {/* 画像エリア */}
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            height: { xs: "60%", md: "100%" },
            minHeight: 300,
            position: "relative",
          }}
          onClick={() => setOpenLightbox(true)}
        >
          <Image
            src={props.post.imageUrl!}
            alt={props.post.title}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        {/* コンテンツエリア */}
        <Stack
          sx={{
            width: { xs: "100%", md: "30%" },
            height: { xs: "40%", md: "100%" },
          }}
        >
          {/* 閉じるボタン（sticky） */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* 本文 */}
          <Stack
            spacing={2}
            sx={{
              px: { xs: 2, md: 4 },
              pb: 4,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {props.post.title}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {props.post.createdAt
                ? new Date(props.post.createdAt).toLocaleString()
                : ""}
            </Typography>

            {/* タグ */}
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {props.post.tags.map((tag) => (
                <Chip key={tag.tag.id} label={tag.tag.name} size="small" />
              ))}
            </Stack>

            {/* 投稿者 */}
            <AuthorCard user={props.post.author} avatarSize={32} />

            {/* 投票 */}
            <VoteButton
              postId={props.post.id}
              currentVoteCount={props.post.votes.length}
              isVoted={props.post.votes.some(
                (v) =>
                  v.userId === props.currentUserId && !v.isSalesApplication,
              )}
              isStudio={props.post.isStudio}
              studioMgmtNo={props.post.studioMgmtNo || undefined}
              title={props.post.title}
              currentUserId={props.currentUserId || null}
              disabled={!props.currentUserId}
            />

            {/* 説明 */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {props.post.description}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Dialog
        open={openLightbox}
        onClose={() => setOpenLightbox(false)}
        fullWidth
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.95)",
              boxShadow: "none",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "90vh",
          }}
        >
          <Image
            src={props.post.imageUrl!}
            alt={props.post.title}
            fill
            style={{
              objectFit: "contain",
            }}
          />

          {/* 閉じるボタン */}
          <IconButton
            onClick={() => setOpenLightbox(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Dialog>
    </Box>
  );
}
