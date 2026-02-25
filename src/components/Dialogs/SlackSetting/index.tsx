"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { setSlackSetting } from "./action";
import React from "react";

export default function SlackSettingDialog({
  userId,
  open,
  onClose,
}: {
  userId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = React.useState("");
  const [isDisplayName, setIsDisplayName] = React.useState("0");

  return (
    <Dialog
      open={open}
      component={"form"}
      onSubmit={async (e) => {
        e.preventDefault();
        await setSlackSetting({
          userId,
          name,
          isDisplayName: isDisplayName === "1",
        });
        onClose();
      }}
    >
      <DialogTitle>Slack設定</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Slackのアカウント名を設定する必要があります。
        </DialogContentText>
        <TextField
          label="Slackアカウント名"
          fullWidth
          margin="normal"
          name="slack_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          defaultValue={"0"}
          name="is_display_name"
          value={isDisplayName}
          onChange={(e) => setIsDisplayName(e.target.value)}
          fullWidth
        >
          <MenuItem value="1">
            <Typography>表示名</Typography>
            <Typography
              variant="caption"
              sx={{ ml: 1, color: "text.secondary" }}
            >
              Slackのプロフィールの表示名です。
            </Typography>
          </MenuItem>
          <MenuItem value="0">
            <Typography>氏名</Typography>
            <Typography
              variant="caption"
              sx={{ ml: 1, color: "text.secondary" }}
            >
              Slackのプロフィールの氏名欄です。表示名が他の方と被る可能性がある方はこちらを選択してください。
            </Typography>
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}
