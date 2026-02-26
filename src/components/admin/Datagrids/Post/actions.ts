"use server";

import prisma from "@/lib/prisma";

export const deletePost = async (postId: string) => {
  try {
    await prisma.post.delete({ where: { id: postId } });
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};

export const updatePost = async ({
  id,
  title,
  description,
  imageUrl,
  isSalesApplication,
}: {
  id: string;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  isSalesApplication?: boolean | null;
}) => {
  try {
    await prisma.post.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        isSalesApplication:
          isSalesApplication == null ? undefined : isSalesApplication,
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    return false;
  }
};
