"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const toggleVote = async ({
  postId,
  newState,
}: {
  postId: string;
  newState: boolean;
}) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    // トランザクションで投票の切り替えとカウントの更新を行う
    const result = await prisma.$transaction(
      async (tx) => {
        if (newState) {
          // いいねを追加
          await tx.vote.upsert({
            where: { userId_postId: { postId, userId } },
            update: {},
            create: { postId, userId },
          });
        } else {
          // いいねを削除
          await tx.vote.deleteMany({
            where: { postId, userId },
          });
        }

        return newState;
      },
      { timeout: 10000 },
    );
    return result;
  } catch (error) {
    console.error("Error toggling vote:", error);
    throw new Error("Failed to toggle vote");
  }
};
