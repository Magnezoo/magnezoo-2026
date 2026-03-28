"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import PostForm from "@/components/Forms/Post";

export default function PostButton({
  className,
  userId,
  path,
  isSalesApplication = false,
  disabled = false,
}: {
  className?: string;
  userId?: string;
  path?: string;
  isSalesApplication?: boolean;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!disabled ? (
        userId ? (
          <>
            <PostForm
              isSalesApplication={isSalesApplication}
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
              type="button"
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
            type="button"
          >
            ログインして投稿する
          </button>
        )
      ) : (
        <button
          disabled
          className={`${className} opacity-50 cursor-not-allowed`}
          type="button"
        >
          応募期間は終了しました
        </button>
      )}
    </>
  );
}
