"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  FormEvent,
} from "react";
import { createPost } from "./action";
import { SnackbarProvider, useSnackbar } from "notistack";

export enum PostFormStep {
  TitleAndDescription = 1,
  ImageUpload = 2,
  PublicationSettings = 3,
}

export default function PostFormClient({
  isSalesApplication,
  userId,
  open,
  onClose,
}: {
  isSalesApplication?: boolean;
  userId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<PostFormStep>(
    PostFormStep.TitleAndDescription,
  );

  const handleNext = () =>
    setStep(
      (s) =>
        Math.min(
          PostFormStep.PublicationSettings,
          (s + 1) as PostFormStep,
        ) as PostFormStep,
    );
  const handleBack = () =>
    setStep(
      (s) =>
        Math.max(
          PostFormStep.TitleAndDescription,
          (s - 1) as PostFormStep,
        ) as PostFormStep,
    );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [salesAgreementChecked, setSalesAgreementChecked] = useState<boolean>(
    isSalesApplication ? false : true,
  );
  const [tosChecked, setTosChecked] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const preview = ((): { url: string; name: string; size: number } | null => {
    if (!image) return null;
    return {
      url: URL.createObjectURL(image),
      name: image.name,
      size: image.size,
    };
  })();

  const openFilePicker = () => fileInputRef.current?.click();
  const onFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(
      e.target.files && e.target.files.length > 0 ? e.target.files[0] : null,
    );
  };

  useEffect(() => {
    return () => {
      if (preview) {
        try {
          URL.revokeObjectURL(preview.url);
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const titleValid = title.trim().length > 0;
  const descriptionValid = description.trim().length > 0;
  const imagesValid = Boolean(image);

  const canProceed = (() => {
    switch (step) {
      case PostFormStep.TitleAndDescription:
        return titleValid && descriptionValid;
      case PostFormStep.ImageUpload:
        return imagesValid;
      case PostFormStep.PublicationSettings:
        return salesAgreementChecked && tosChecked;
      default:
        return false;
    }
  })();

  const { enqueueSnackbar } = useSnackbar();

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 入力フィールドはステップでアンマウントされるため
    // フォーム要素から取得せず、コンポーネントの state を使って送信する
    if (!image) {
      enqueueSnackbar("画像が選択されていません。", { variant: "error" });
      return;
    }

    try {
      const compressedImage = await compressImage(image, 1024, 0.8);
      const success = await createPost({
        title: String(title),
        content: String(description),
        image: compressedImage,
        userId,
        isSalesApplication: Boolean(salesAgreementChecked),
      });

      if (success) {
        enqueueSnackbar("投稿が保存されました！", { variant: "success" });
        onClose();
      } else {
        enqueueSnackbar("投稿の保存に失敗しました。", { variant: "error" });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("投稿の保存中にエラーが発生しました。", {
        variant: "error",
      });
    }
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Stack
        spacing={2}
        justifyContent="start"
        alignItems="center"
        width="100%"
        position="fixed"
        top={0}
        left={0}
        zIndex={900}
        onClick={onClose}
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
            id="toolbar"
            sx={{
              display: { xs: "none", md: "flex" },
              width: { md: "320px", xl: "560px" },
              py: { md: 10 },
              borderRight: { md: "#707070 1px solid" },
              alignItems: "center",
            }}
          >
            <MenuList
              sx={{
                gap: 2,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                px: { xs: 2, md: 4 },
              }}
            >
              <MenuItem
                onClick={() => setStep(PostFormStep.TitleAndDescription)}
                sx={{
                  fontSize: { xs: 18, xl: 32 },
                  color: "#707070",
                  fontWeight:
                    step === PostFormStep.TitleAndDescription
                      ? "bold"
                      : "semibold",
                  backgroundColor:
                    step === PostFormStep.TitleAndDescription
                      ? "rgba(0,0,0,0.04)"
                      : "transparent",
                  whiteSpace: { xs: "normal", xl: "nowrap" },
                  py: { xs: 1.5, xl: 2 },
                }}
              >
                1. タイトルと説明
              </MenuItem>
              <MenuItem
                onClick={() => setStep(PostFormStep.ImageUpload)}
                sx={{
                  fontSize: { xs: 18, xl: 32 },
                  color: "#707070",
                  fontWeight:
                    step === PostFormStep.ImageUpload ? "bold" : "semibold",
                  backgroundColor:
                    step === PostFormStep.ImageUpload
                      ? "rgba(0,0,0,0.04)"
                      : "transparent",
                  whiteSpace: { xs: "normal", xl: "nowrap" },
                  py: { xs: 1.5, xl: 2 },
                }}
              >
                2. 画像のアップロード
              </MenuItem>
              <MenuItem
                onClick={() => setStep(PostFormStep.PublicationSettings)}
                sx={{
                  fontSize: { xs: 18, xl: 32 },
                  color: "#707070",
                  fontWeight:
                    step === PostFormStep.PublicationSettings
                      ? "bold"
                      : "semibold",
                  backgroundColor:
                    step === PostFormStep.PublicationSettings
                      ? "rgba(0,0,0,0.04)"
                      : "transparent",
                  whiteSpace: { xs: "normal", xl: "nowrap" },
                  py: { xs: 1.5, xl: 2 },
                }}
              >
                3. 公開設定
              </MenuItem>
            </MenuList>
          </Stack>

          <Stack
            component="form"
            py={{ xs: 6, xl: 12 }}
            px={{ xs: 3, xl: 10 }}
            gap={4}
            flex={1}
            onSubmit={handleSubmit}
            sx={{
              position: "relative",
              overflowY: { xs: "auto", md: "visible" },
              maxHeight: { xs: "calc(100vh - 80px)", md: "none" },
            }}
          >
            <Box sx={{ position: "absolute", top: 12, right: 12 }}>
              <IconButton
                onClick={onClose}
                aria-label="閉じる"
                color="primary"
                size="large"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Stack gap={2} flex={1}>
              {(() => {
                switch (step) {
                  case PostFormStep.TitleAndDescription:
                    return (
                      <>
                        <Typography
                          variant="h4"
                          fontWeight="semibold"
                          mb={2}
                          color="#707070"
                          textAlign="left"
                        >
                          タイトルと説明を入力してください。
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <TextField
                            fullWidth
                            name="title"
                            label="タイトル"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                          />
                          <FormHelperText sx={{ fontSize: 15 }}>
                            タイトルは投稿の内容を簡潔に表すものにしてください。
                          </FormHelperText>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <TextField
                            fullWidth
                            label="説明"
                            name="description"
                            variant="outlined"
                            multiline
                            rows={7}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          />
                          <FormHelperText sx={{ fontSize: 15 }}>
                            説明は投稿の内容を詳しく説明するものにしてください。
                          </FormHelperText>
                        </Box>
                      </>
                    );

                  case PostFormStep.ImageUpload:
                    return (
                      <>
                        <Typography
                          variant="h4"
                          fontWeight="semibold"
                          mb={2}
                          color="#707070"
                          textAlign="left"
                        >
                          画像をアップロード
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <input
                            name="image"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={onFilesSelected}
                            style={{ display: "none" }}
                            required
                          />
                          <Button variant="outlined" onClick={openFilePicker}>
                            画像を選択
                          </Button>
                          <FormHelperText sx={{ fontSize: 15 }}>
                            {image
                              ? `${image.name} を選択済み`
                              : "画像を追加してください (必須)"}
                          </FormHelperText>

                          {preview && (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 4,
                                mt: 4,
                                flexWrap: "wrap",
                                width: "100%",
                                justifyContent: {
                                  xs: "center",
                                  xl: "flex-start",
                                },
                              }}
                            >
                              <Box
                                key={preview.url}
                                sx={{
                                  width: { xs: "100%", sm: 540, xl: 360 },
                                  textAlign: "center",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={preview.url}
                                  alt={preview.name}
                                  sx={{
                                    width: "100%",
                                    height: { xs: 200, sm: 240 },
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    border: "1px solid #e0e0e0",
                                  }}
                                />
                                <Typography
                                  sx={{ fontSize: { xs: 14, xl: 14 }, mt: 1 }}
                                  noWrap
                                >
                                  {preview.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: { xs: 13, xl: 13 },
                                    color: "#666",
                                  }}
                                >
                                  {formatBytes(preview.size)}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </>
                    );

                  case PostFormStep.PublicationSettings:
                    return (
                      <>
                        <Typography
                          variant="h4"
                          fontWeight="semibold"
                          mb={2}
                          textAlign="left"
                          color="#707070"
                        >
                          公開設定
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            alignItems: "flex-start",
                          }}
                        >
                          <input
                            hidden
                            name="isSalesApp"
                            type="checkbox"
                            defaultChecked
                          />

                          {isSalesApplication && (
                            <FormControlLabel
                              name="isSalesApp"
                              control={
                                <Checkbox
                                  name="isSalesApp"
                                  checked={salesAgreementChecked}
                                  onChange={(e) =>
                                    setSalesAgreementChecked(e.target.checked)
                                  }
                                  required
                                />
                              }
                              required
                              label="磁石祭2026の物販企画にて販売される可能性があること、その場合、運営からの連絡に対応する必要があることを理解しています。"
                            />
                          )}

                          <FormControlLabel
                            name="agreeTos"
                            control={
                              <Checkbox
                                name="agreeTos"
                                checked={tosChecked}
                                onChange={(e) =>
                                  setTosChecked(e.target.checked)
                                }
                                required
                              />
                            }
                            required
                            label={
                              <>
                                <Link href={"/terms"}>利用規約</Link>と
                                <Link href={"/privacy"}>
                                  プライバシー・ポリシー
                                </Link>
                                に同意します。
                              </>
                            }
                          />
                        </Box>
                      </>
                    );

                  default:
                    return null;
                }
              })()}
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {step !== PostFormStep.TitleAndDescription && (
                <Button variant="outlined" onClick={handleBack} type="button">
                  戻る
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={
                  step === PostFormStep.PublicationSettings
                    ? undefined
                    : handleNext
                }
                type={
                  step === PostFormStep.PublicationSettings
                    ? "submit"
                    : "button"
                }
                disabled={!canProceed}
              >
                {step === PostFormStep.PublicationSettings ? "保存" : "次へ"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </SnackbarProvider>
  );
}

const compressImage = (
  file: File,
  maxSize: number,
  quality: number,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvasのコンテキストを取得できませんでした。"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: blob.type }));
          } else {
            reject(new Error("画像の圧縮に失敗しました。"));
          }
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = () => {
      reject(new Error("画像の読み込みに失敗しました。"));
    };

    img.src = url;
  });
};
