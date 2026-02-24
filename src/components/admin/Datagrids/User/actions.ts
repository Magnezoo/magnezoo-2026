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

export const updateUser = async ({
  id,
  name,
  role,
  banned,
  banReason,
  banExpires,
}: {
  id: string;
  name?: string;
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | null;
}) => {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        role,
        banned,
        banReason,
        banExpires,
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};
