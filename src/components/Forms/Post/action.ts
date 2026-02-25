"use server";

import prisma from "@/lib/prisma";
import fs from "fs";

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

    await prisma.post.create({
      data: {
        title,
        description: content,
        imageUrl: `/img/posts/${filename}`,
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
