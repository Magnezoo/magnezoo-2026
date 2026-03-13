"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { updateSlacksName, uploadProfileImage } from "./action";
import FileUpload from "./FileUpload";

type SettingsFormProps = {
  initialName: string;
  initialImage: string | null;
  initialSlackName: string;
  initialSlackDisplayName: boolean;
  userId: string;
};

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const SettingsForm = ({
  initialName,
  initialImage,
  initialSlackName,
  initialSlackDisplayName,
  userId,
}: SettingsFormProps) => {
  const router = useRouter();
  const [slackName, setSlackName] = useState(initialSlackName);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    return initialImage || "";
  }, [initialImage, selectedFile]);

  useEffect(() => {
    if (!selectedFile || !previewUrl) {
      return;
    }
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, selectedFile]);

  const handleFileSelect = (file: File) => {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      setMessage(
        "対応していない画像形式です。JPEG/PNG/WebP/GIFを選択してください。",
      );
      return;
    }

    setSelectedFile(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let imageUrl = initialImage;

      if (selectedFile) {
        const uploaded = await uploadProfileImage(selectedFile);
        if (uploaded.error || !uploaded.imageUrl) {
          setMessage(uploaded.error || "画像アップロードに失敗しました。");
          return;
        }
        imageUrl = uploaded.imageUrl;
      }

      // ユーザープロフィール（アイコン）を更新
      if (selectedFile) {
        const result = await authClient.updateUser({
          image: imageUrl || undefined,
        });

        if (result.error) {
          setMessage("保存に失敗しました。時間をおいて再度お試しください。");
          return;
        }
      }

      // Slack情報を更新
      const slackResult = await updateSlacksName(
        userId,
        slackName,
        initialSlackDisplayName,
      );

      if (!slackResult.success) {
        setMessage(slackResult.error || "Slack設定の保存に失敗しました。");
        return;
      }

      setMessage("保存しました。");
      setSelectedFile(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("保存中にエラーが発生しました。");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 520 }}>
      {!initialSlackName && (
        <Typography variant="caption" color="error">
          Slackのアカウント名が見つかりません。まだ応募していない場合は、
          <Link href="/sales_app" className="text-blue-500 hover:underline">
            応募フォーム
          </Link>
          から応募してください。
        </Typography>
      )}
      <Box>
        <TextField
          label="Slackのアカウント名"
          value={slackName}
          disabled={!initialSlackName}
          onChange={(event) => setSlackName(event.target.value)}
          fullWidth
          helperText=""
        />
        <Typography variant="caption" color="text.secondary" className="mb-2">
          Slackのアカウント名は、応募するときに入力したSlackの氏名, 表示名です。
        </Typography>
      </Box>

      <Typography variant="h3" gutterBottom>
        アイコン
      </Typography>

      <Box className="flex items-center gap-10">
        <div>
          {" "}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            現在のアイコン
          </Typography>
          <Avatar
            src={previewUrl}
            alt={initialName || "ユーザー"}
            sx={{ width: 96, height: 96, bgcolor: "orange" }}
          >
            {initialName?.charAt(0) || "U"}
          </Avatar>
        </div>
        <FileUpload
          accept="image/jpeg,image/png,image/webp,image/gif"
          onFileSelect={handleFileSelect}
          disabled={saving}
        />
      </Box>

      <Box className="flex justify-end">
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          startIcon={
            saving ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          保存する
        </Button>
      </Box>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={2500}
        onClose={() => setMessage(null)}
        message={message}
      />
    </Stack>
  );
};

export default SettingsForm;
