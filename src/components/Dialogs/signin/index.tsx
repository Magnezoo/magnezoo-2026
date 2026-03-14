"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type SignInErrorDialogProps = {
  error: string | null;
  onClose: () => void;
};

const BANNED_ACCOUNT_MESSAGE =
  "あなたのアカウントは削除されています。(自分で削除した場合もこのメッセージが表示されます)。再度アカウントを作成するには、Slackで「あかつきゆいと」にお問い合わせください。";

const mapAuthErrorMessage = (raw: string | null | undefined): string | null => {
  if (!raw) {
    return null;
  }

  const normalized = raw.toLowerCase();
  const isBannedError =
    normalized.includes("banned") ||
    normalized.includes("ban") ||
    normalized.includes("user_banned") ||
    normalized.includes("deleted");

  if (isBannedError) {
    return BANNED_ACCOUNT_MESSAGE;
  }

  return raw;
};

export default function SignInErrorDialog({
  error,
  onClose,
}: SignInErrorDialogProps) {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);

  const queryError = useMemo(() => {
    return (
      searchParams.get("error") ||
      searchParams.get("code") ||
      searchParams.get("message") ||
      searchParams.get("error_description")
    );
  }, [searchParams]);

  const message = useMemo(() => {
    const directMessage = error || (!dismissed ? queryError : null);
    if (directMessage) {
      return mapAuthErrorMessage(directMessage);
    }

    if (dismissed || typeof window === "undefined") {
      return null;
    }

    const pending = sessionStorage.getItem("signin_oauth_pending") === "1";
    const startedAt = Number(
      sessionStorage.getItem("signin_oauth_started_at") || "0",
    );
    const isFresh = startedAt > 0 && Date.now() - startedAt < 5 * 60 * 1000;

    return pending && isFresh ? BANNED_ACCOUNT_MESSAGE : null;
  }, [error, queryError, dismissed]);

  const handleClose = () => {
    setDismissed(true);
    sessionStorage.removeItem("signin_oauth_pending");
    sessionStorage.removeItem("signin_oauth_started_at");
    onClose();
  };

  return (
    <Dialog
      open={Boolean(message)}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>サインインに失敗しました</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || "不明なエラーが発生しました。"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
