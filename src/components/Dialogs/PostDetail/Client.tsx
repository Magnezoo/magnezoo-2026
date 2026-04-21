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
import { useCallback, useEffect, useState } from "react";
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
  const [openLightbox, setOpenLightbox] = useState(false);

  const handleClose = useCallback(() => {
    if (props.closeRedirectTo) {
      router.push(props.closeRedirectTo);
    } else {
      router.back();
    }
  }, [props.closeRedirectTo, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return;
      }

      if (openLightbox) {
        setOpenLightbox(false);
        return;
      }

      handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, openLightbox]);

  return (
    <Box
      onClick={handleClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 900,
        backgroundColor: "rgba(0,0,0,0.9)", // 没入感を高めるためさらに暗く
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "flex-start", md: "center" },
        p: { xs: 0, md: 2, lg: 4 }, // 画面が大きいほど余白をとって枠線を際立たせる
        pt: { xs: 7, lg: 12 },
        overflowY: { xs: "auto", md: "hidden" },
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "90vw",
            md: "95vw",
            lg: "1600px",
          },
          height: { xs: "auto", md: "90vh" },
          minHeight: { xs: "100%", md: "auto" },
          backgroundColor: "#fff",
          borderRadius: { xs: 0, md: 2 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* 左側：画像エリア（比率を 80% に拡大） */}
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            height: { xs: "50vh", sm: "60vh", md: "100%" },
            position: "relative",
            flexShrink: 0,
            cursor: "zoom-in",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setOpenLightbox(true)}
        >
          <Image
            src={props.post.imageUrl!}
            alt={props.post.title}
            fill
            priority
            style={{
              objectFit: "contain",
              padding: "10px",
            }}
          />
        </Box>

        {/* 右: コンテンツエリア */}
        <Stack
          sx={{
            width: { xs: "100%", md: "20%" },
            minWidth: { md: "300px" },
            height: "100%",
            overflowY: { xs: "visible", md: "auto" },
            backgroundColor: "#fff",
            borderLeft: { md: "1px solid #ececec" },
          }}
        >
          {/* 閉じるボタン（sticky） */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "flex-end",
              p: 1.5,
              backgroundColor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              zIndex: 10,
              borderBottom: "1px solid #f9f9f9",
            }}
          >
            <IconButton onClick={handleClose} sx={{ color: "text.primary" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* コンテンツ本体 */}
          <Stack spacing={4} sx={{ px: 3, py: 4, pb: 10 }}>
            <Box>
              <Typography
                variant="h5"
                fontWeight="800"
                component="h1"
                gutterBottom
              >
                {props.post.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ display: "block" }}
              >
                {props.post.createdAt
                  ? new Date(props.post.createdAt).toLocaleString("ja-JP", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })
                  : ""}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {props.post.tags.map((tag) => (
                <Chip
                  key={tag.tag.id}
                  label={tag.tag.name}
                  size="small"
                  variant="filled"
                  sx={{
                    bgcolor: "#f0f0f0",
                    fontWeight: 500,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#e0e0e0" },
                  }}
                />
              ))}
            </Stack>

            <Box
              sx={{
                py: 1,
                borderTop: "1px solid #f5f5f5",
                borderBottom: "1px solid #f5f5f5",
              }}
            >
              <AuthorCard user={props.post.author} avatarSize={40} />
            </Box>

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

            <Box>
              <Typography
                variant="overline"
                color="text.disabled"
                sx={{ fontWeight: "bold" }}
              >
                Description
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  mt: 1,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  lineHeight: 1.8,
                  fontSize: "0.9rem",
                }}
              >
                {props.post.description}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* ライトボックス表示 */}
      <Dialog
        open={openLightbox}
        onClose={() => setOpenLightbox(false)}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.98)",
              boxShadow: "none",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setOpenLightbox(false)}
        >
          <Image
            src={props.post.imageUrl!}
            alt={props.post.title}
            fill
            style={{ objectFit: "contain" }}
          />
          <IconButton
            onClick={() => setOpenLightbox(false)}
            sx={{
              position: "absolute",
              top: 32,
              right: 32,
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            <CloseIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Dialog>
    </Box>
  );
}
