"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const toggleVote = async ({ postId }: { postId: string }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    // 既に投票しているか確認
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingVote) {
      // 投票を削除（いいねを取り消す）
      await prisma.vote.delete({
        where: { userId_postId: { userId, postId } },
      });
      return { liked: false };
    } else {
      // 投票を作成（いいねする）
      await prisma.vote.create({
        data: { postId, userId },
      });
      return { liked: true };
    }
  } catch (error) {
    console.error("Error toggling vote:", error);
    throw new Error("Failed to toggle vote");
  }
};
