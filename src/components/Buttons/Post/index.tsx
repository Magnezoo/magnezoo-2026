"use client";

import PostForm from "@/components/Forms/Post";
import { useState } from "react";

export default function PostButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PostForm
        isSalesApplication
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <button onClick={() => setOpen(true)} className={`${className}`}>
        投稿する
      </button>
    </>
  );
}
