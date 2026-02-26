"use client";
import { useState } from "react";
import SlackSettingDialog from ".";

export default function SlackSttingsGuard({
  isNeed,
  userId,
}: {
  isNeed: boolean;
  userId: string;
}) {
  const [open, setOpen] = useState(isNeed);
  return (
    <SlackSettingDialog
      userId={userId}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    />
  );
}
