"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { setSlackSetting } from "./action";

export default function NameSettingDialog({
  userId,
  open,
  onClose,
  currentName,
  currentSlack,
}: {
  userId: string;
  open: boolean;
  onClose: () => void;
  currentName?: string | null;
  currentSlack?: {
    userId: string;
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isDisplayname: boolean;
  } | null;
}) {
  const [name, setName] = React.useState(currentSlack?.name || "");
  const [isDisplayName, setIsDisplayName] = React.useState(
    currentSlack?.isDisplayname ? "1" : "0",
  );
  const [nickName, setNickName] = React.useState(currentName || "");

  return (
    <Dialog
      open={open}
      component={"form"}
      onSubmit={async (e) => {
        e.preventDefault();
        await setSlackSetting({
          userId,
          name,
          nickName,
          isDisplayName: isDisplayName === "1",
        });
        onClose();
      }}
    >
      <DialogTitle>名前の設定</DialogTitle>
      <DialogContent>
        <DialogContentText>
          サイト上で表示される名前を自由に設定できます。
        </DialogContentText>
        <TextField
          label="サイト上での表示名"
          fullWidth
          margin="normal"
          name="nick_name"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <Divider sx={{ my: 2 }} />

        <DialogContentText>
          Slackのアカウント名を設定してください。これはサイトの表示名とは別です。
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
