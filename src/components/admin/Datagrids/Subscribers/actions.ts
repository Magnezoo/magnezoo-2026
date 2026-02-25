"use server";

import prisma from "@/lib/prisma";

export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
