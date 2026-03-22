"use server";

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
  // Slack設定は必ず表示名として保持
  await prisma.slacks.upsert({
    where: { userId },
    update: { name, isDisplayname: isDisplayName },
    create: { userId, name, isDisplayname: isDisplayName },
  });

  // サイト上の表示名としてnickNameを保存
  await prisma.user.update({
    where: { id: userId },
    data: { nickName },
  });
};
