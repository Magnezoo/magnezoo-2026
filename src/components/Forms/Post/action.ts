"use server";

import fs from "node:fs";
import prisma from "@/lib/prisma";

const MAX_TAGS = 5;

// タグの取得（名前順）
export const getTags = async (): Promise<{ id: string; name: string }[]> => {
  return await prisma.tags.findMany({ orderBy: { name: "asc" } });
};

export const createPost = async ({
  title,
  content,
  image,
  userId,
  isSalesApplication,
  tagNames = [],
}: {
  title: string;
  content: string;
  image: File;
  userId: string;
  isSalesApplication: boolean;
  tagNames?: string[];
}) => {
  try {
    const dir = `${process.cwd()}/public/img/posts`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filename = `${Date.now()}-${image?.name}`;
    const filepath = `${dir}/${filename}`;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(filepath, buffer);
    }

    // タグ名は最大32文字に切り詰め、重複を除去し、5件までに制限する
    const validTagNames = [
      ...new Set(tagNames.map((n) => n.trim().slice(0, 32)).filter(Boolean)),
    ].slice(0, MAX_TAGS);

    const imageUrl = `/api/post_images/${filename}`;

    await prisma.post.create({
      data: {
        title,
        description: content,
        imageUrl,
        isSalesApplication,
        authorId: userId,
        tags:
          validTagNames.length > 0
            ? {
                create: validTagNames.map((name) => ({
                  tag: {
                    connectOrCreate: {
                      where: { name },
                      create: { name },
                    },
                  },
                })),
              }
            : undefined,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    return false;
  }
};

export const updatePost = async ({
  id,
  title,
  content,
  image,
  isSalesApplication,
  tagNames = [],
}: {
  id: string;
  title: string;
  content: string;
  image?: File | null;
  isSalesApplication: boolean;
  tagNames?: string[];
}) => {
  try {
    let imageUrl: string | undefined = undefined;

    if (image) {
      const dir = `${process.cwd()}/public/img/posts`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const filename = `${Date.now()}-${image.name}`;
      const filepath = `${dir}/${filename}`;

      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(filepath, buffer);
      imageUrl = `/api/post_images/${filename}`;
    }

    const validTagNames = [
      ...new Set(tagNames.map((n) => n.trim().slice(0, 32)).filter(Boolean)),
    ].slice(0, MAX_TAGS);

    await prisma.post.update({
      where: { id },
      data: {
        title,
        description: content,
        isSalesApplication,
        ...(imageUrl ? { imageUrl } : {}),
        tags: {
          deleteMany: {},
          create: validTagNames.map((name) => ({
            tag: {
              connectOrCreate: {
                where: { name },
                create: { name },
              },
            },
          })),
        },
      },
    });

    const { revalidatePath } = await import("next/cache");
    revalidatePath(`/admin/posts/${id}`);
    revalidatePath(`/admin/posts`);

    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    return false;
  }
};
