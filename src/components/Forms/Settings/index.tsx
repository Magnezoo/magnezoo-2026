"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { uploadProfileImage } from "./action";
import FileUpload from "./FileUpload";

type SettingsFormProps = {
  initialName: string;
  initialImage: string | null;
};

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const SettingsForm = ({ initialName, initialImage }: SettingsFormProps) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
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
    const trimmedName = name.trim();
    if (!trimmedName) {
      setMessage("名前を入力してください。");
      return;
    }

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

      const result = await authClient.updateUser({
        name: trimmedName,
        image: imageUrl || undefined,
      });

      if (result.error) {
        setMessage("保存に失敗しました。時間をおいて再度お試しください。");
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
      <Box>
        <TextField
          label="表示名"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
      </Box>

      <Box className="flex items-center gap-10">
        <div>
          {" "}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            現在のアイコン
          </Typography>
          <Avatar
            src={previewUrl}
            alt={name || "ユーザー"}
            sx={{ width: 96, height: 96, bgcolor: "orange" }}
          >
            {name?.charAt(0) || "U"}
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
