"use client";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useId, useRef, useState } from "react";

type FileUploadProps = {
  accept?: string;
  disabled?: boolean;
  onFileSelect?: (file: File) => void;
};

const FileUpload = ({
  accept = "image/*",
  disabled = false,
  onFileSelect,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file || disabled) {
      return;
    }
    onFileSelect?.(file);
  };

  return (
    <Box>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(event) => {
          handleFile(event.target.files?.[0] ?? null);
          event.currentTarget.value = "";
        }}
      />

      <Box
        component="label"
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) {
            setIsDragging(true);
          }
        }}
        onDragLeave={() => {
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files?.[0] ?? null);
        }}
        sx={{
          width: 170,
          minHeight: 92,
          borderRadius: "8px",
          bgcolor: "#d9d9d9",
          border: "1px solid",
          borderColor: isDragging ? "#8d8d8d" : "#b6b6b6",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color 0.15s ease, background-color 0.15s ease",
          opacity: disabled ? 0.6 : 1,
          "&:hover": {
            bgcolor: disabled ? "#d9d9d9" : "#cfcfcf",
          },
        }}
      >
        <Box
          sx={{
            px: 1.2,
            py: 0.7,
            display: "grid",
            placeItems: "center",
            color: "#5f5f5f",
          }}
        >
          <CloudUploadOutlinedIcon sx={{ fontSize: 36, mb: 0.25 }} />

          <Typography
            variant="caption"
            sx={{ fontSize: 11, lineHeight: 1.3, color: "#585858" }}
          >
            ドラッグもしくはクリックで
            <br />
            アップロード
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FileUpload;
