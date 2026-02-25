"use server";

import prisma from "@/lib/prisma";

export const setSlackSetting = async ({
  userId,
  name,
  isDisplayName,
}: {
  userId: string;
  name: string;
  isDisplayName: boolean;
}) => {
  await prisma.slacks.upsert({
    where: { userId },
    update: { name, isDisplayname: isDisplayName },
    create: { userId, name, isDisplayname: isDisplayName },
  });
};
