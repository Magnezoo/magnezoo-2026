"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const setSlackSetting = async ({
  userId,
  name,
  nickName,
  isDisplayName,
}: {
  userId: string;
  name: string;
  nickName: string;
  isDisplayName: boolean;
}) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }
  // Slack設定とサイト上の表示名を原子性を持って保存
  await prisma.$transaction(async (tx) => {
    await tx.slacks.upsert({
      where: { userId },
      update: { name, isDisplayname: isDisplayName },
      create: { userId, name, isDisplayname: isDisplayName },
    });

    await tx.user.update({
      where: { id: userId },
      data: { nickName: nickName.trim() },
    });
  });
};
