"use client";

import { SnackbarProvider } from "notistack";
import PostFormClient from "./Client";

export default function PostForm({
  isSalesApplication,
  userId,
  open,
  onClose,
}: {
  isSalesApplication?: boolean;
  userId: string;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <PostFormClient
        isSalesApplication={isSalesApplication}
        userId={userId}
        open={open}
        onClose={onClose}
      />
    </SnackbarProvider>
  );
}
