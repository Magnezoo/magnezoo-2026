"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteAccountDialogProps = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteAccountDialog({
  open,
  loading = false,
  onClose,
  onConfirm,
}: DeleteAccountDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!loading) {
          onClose();
        }
      }}
    >
      <DialogTitle>アカウントを削除しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText>
          この操作は取り消せません。アカウントは削除扱いとなり、ログインできなくなります。
          削除したあと、アカウントを再度作成するには、Slackで「あかつきゆいと」にお問い合わせください。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} color="inherit">
          キャンセル
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
