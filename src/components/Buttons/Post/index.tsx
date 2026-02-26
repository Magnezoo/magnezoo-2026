"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import PostForm from "@/components/Forms/Post";

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
      {userId ? (
        <>
          <PostForm
            isSalesApplication
            userId={userId}
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
          <button
            onClick={() => setOpen(true)}
            className={`${className}`}
            id="post_btn"
          >
            投稿する
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            redirect(
              `/signin${path ? `?redirect_to=${encodeURIComponent(path)}` : ""}`,
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
