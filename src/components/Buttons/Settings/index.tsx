"use client";

import Button from "@mui/material/Button";

type DeleteAccountButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export default function DeleteAccountButton({
  disabled = false,
  onClick,
}: DeleteAccountButtonProps) {
  return (
    <Button
      variant="contained"
      color="error"
      disabled={disabled}
      onClick={onClick}
    >
      削除
    </Button>
  );
}
