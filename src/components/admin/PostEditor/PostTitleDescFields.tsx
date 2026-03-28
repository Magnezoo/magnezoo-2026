"use client";

import { Box, TextField } from "@mui/material";

export default function PostTitleDescFields({
  title,
  setTitle,
  description,
  setDescription,
  disabled,
}: {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <Box>
      <TextField
        fullWidth
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={disabled}
        required
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="説明"
        multiline
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={disabled}
        required
      />
    </Box>
  );
}
