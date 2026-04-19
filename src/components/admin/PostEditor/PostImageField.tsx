"use client";

import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";

export default function PostImageField({
  image,
  setImage,
  existingImageUrl,
  disabled,
  imagePosition,
  setImagePosition,
}: {
  image: File | null;
  setImage: (f: File | null) => void;
  existingImageUrl?: string;
  disabled: boolean;
  imagePosition: number;
  setImagePosition: (val: number) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewUrl = useMemo(() => {
    if (image) return URL.createObjectURL(image);
    return existingImageUrl;
  }, [image, existingImageUrl]);

  useEffect(() => {
    // image から生成された object URL のみをクリーンアップ
    if (!image) return;
    const objectUrl = URL.createObjectURL(image);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

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
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            プレビュー (16:9 表示枠)
          </Typography>

          <Box
            component="img"
            src={previewUrl}
            sx={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              objectPosition: `center ${imagePosition}%`,
              borderRadius: 1,
              border: "1px solid #ddd",
              bgcolor: "grey.100", // 画像読み込み前や透過画像の背景用
            }}
          />

          <Box sx={{ mt: 2, px: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="caption"
                sx={{ minWidth: 80, fontWeight: "bold" }}
              >
                表示位置(上下)
              </Typography>
              <Slider
                value={imagePosition}
                min={0}
                max={100}
                onChange={(_, value) => setImagePosition(value as number)}
                disabled={disabled}
                valueLabelDisplay="auto"
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {
                "※スライダーを動かして、16:9の枠内に表示したい部分を調整してください。"
              }
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
