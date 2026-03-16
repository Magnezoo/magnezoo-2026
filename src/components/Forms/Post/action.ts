"use server";

import fs from "node:fs";
import prisma from "@/lib/prisma";

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

    // タグ名は最大20文字に切り詰め、重複を除去する
    const validTagNames = [
      ...new Set(tagNames.map((n) => n.trim().slice(0, 20)).filter(Boolean)),
    ];

    await prisma.post.create({
      data: {
        title,
        description: content,
        imageUrl: `https://magnezoo.unipro-n.com/api/post_images/${filename}`,
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
