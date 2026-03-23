"use client";
import { useState } from "react";
import NameSettingGuard from ".";

export default function SlackSttingsGuard({
  isNeed,
  userId,
}: {
  isNeed: boolean;
  userId: string;
}) {
  const [open, setOpen] = useState(isNeed);
  return (
    <NameSettingGuard
      userId={userId}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    />
  );
}
