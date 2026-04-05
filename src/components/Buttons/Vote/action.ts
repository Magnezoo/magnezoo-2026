"use server";

import { headers } from "next/headers";
import type { SalesType } from "@/generated/prisma/browser";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const toggleVote = async ({
  postId,
  newState,
  isSalesApplication = false,
  salesType = null,
}: {
  postId: string;
  newState: boolean;
  isSalesApplication?: boolean;
  salesType?: SalesType | null;
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
            where: {
              userId_postId: { postId, userId },
              isSalesApplication,
              salesType,
            },
            update: {},
            create: { postId, userId, isSalesApplication, salesType },
          });
        } else {
          // いいねを削除
          await tx.vote.deleteMany({
            where: {
              userId_postId: { postId, userId },
              isSalesApplication,
              salesType,
            },
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
