"use server";

import fs from "node:fs";
import prisma from "@/lib/prisma";

export const createPost = async ({
  title,
  content,
  image,
  userId,
  isSalesApplication,
}: {
  title: string;
  content: string;
  image: File;
  userId: string;
  isSalesApplication: boolean;
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

    const imageUrl = `/api/post_images/${filename}`;

    await prisma.post.create({
      data: {
        title,
        description: content,
        imageUrl,
        isSalesApplication,
        authorId: userId,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    return false;
  }
};
