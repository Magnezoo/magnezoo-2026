"use client";
import { useState } from "react";
import NameSettingDialog from "./Dialog";

export default function NameSettingGuardClient({
  isNeed,
  userId,
  currentName,
  currentSlack,
}: {
  isNeed: boolean;
  userId: string;
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
  const [open, setOpen] = useState(isNeed);
  return (
    <NameSettingDialog
      userId={userId}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      currentName={currentName}
      currentSlack={currentSlack}
    />
  );
}
