"use server";

import prisma from "@/lib/prisma";

export const toggleVote = async ({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId: string;
}) => {
  try {
    // 既に投票しているか確認
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: currentUserId,
          postId,
        },
      },
    });

    if (existingVote) {
      // 投票を削除（いいねを取り消す）
      await prisma.vote.delete({
        where: { userId_postId: { userId: currentUserId, postId } },
      });
      return { liked: false };
    } else {
      // 投票を作成（いいねする）
      await prisma.vote.create({
        data: { postId, userId: currentUserId },
      });
      return { liked: true };
    }
  } catch (error) {
    console.error("Error toggling vote:", error);
    throw new Error("Failed to toggle vote");
  }
};
