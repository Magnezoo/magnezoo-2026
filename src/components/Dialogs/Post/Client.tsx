"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import type { Post } from "@/generated/prisma/client";

export enum PostFormStep {
  TitleAndDescription = 1,
  ImageUpload = 2,
  PublicationSettings = 3,
}

interface Props {
  id: string;
  post: Post;
  closeRedirectTo?: string;
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
        <Stack
          py={{ xs: 6, xl: 12 }}
          px={{ xs: 3, xl: 10 }}
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
        </Stack>
      </Stack>
    </Stack>
  );
}
