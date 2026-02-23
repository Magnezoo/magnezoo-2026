"use client";

import PostForm from "@/components/Forms/Post";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function PostButton({
  className,
  userId,
  path,
}: {
  className?: string;
  userId?: string;
  path?: string;
}) {
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
      {userId ? (
        <button
          onClick={() => setOpen(true)}
          className={`${className}`}
          id="post_btn"
        >
          投稿する
        </button>
      ) : (
        <button
          onClick={() => {
            redirect(
              `/signin${path ? `?redirect=${encodeURIComponent(path)}` : ""}`,
            );
          }}
          className={`${className}`}
        >
          ログインして投稿する
        </button>
      )}
    </>
  );
}
