"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export default function PostImageField({
  image,
  setImage,
  existingImageUrl,
  disabled,
}: {
  image: File | null;
  setImage: (f: File | null) => void;
  existingImageUrl?: string;
  disabled: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrl = image ? URL.createObjectURL(image) : existingImageUrl;

  useEffect(() => {
    return () => {
      if (image && previewUrl && !existingImageUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image, previewUrl, existingImageUrl]);

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        画像
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Button
          variant="outlined"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          画像を変更
        </Button>
        <Typography variant="caption" color="text.secondary">
          {image ? "新しい画像を選択済み" : "変更する場合のみ選択してください"}
        </Typography>
      </Stack>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      {previewUrl && (
        <Box
          component="img"
          src={previewUrl}
          sx={{
            width: "100%",
            maxHeight: 400,
            objectFit: "contain",
            borderRadius: 1,
            border: "1px solid #ddd",
          }}
        />
      )}
    </Box>
  );
}
