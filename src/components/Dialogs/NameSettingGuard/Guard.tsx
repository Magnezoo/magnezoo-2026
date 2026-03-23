"use client";
import { useState } from "react";
import NameSettingDialog from ".";

export default function NameSettingGuard({
  isNeed,
  userId,
}: {
  isNeed: boolean;
  userId: string;
}) {
  const [open, setOpen] = useState(isNeed);
  return (
    <NameSettingDialog
      userId={userId}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    />
  );
}
