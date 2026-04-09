"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ulid } from "ulid";
import { auth } from "@/lib/auth";
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
    // file-typeで拡張子を判定し、パストラバーサル等のリスクを排除
    const { fileTypeFromBuffer } = await import("file-type");
    const MIME_TO_EXT: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
    };
    const dir = `${process.cwd()}/public/img/posts`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileType = await fileTypeFromBuffer(buffer);
    if (!fileType || !MIME_TO_EXT[fileType.mime]) {
      console.error("Invalid image type:", fileType?.mime);
      return false;
    }
    const ext = MIME_TO_EXT[fileType.mime];
    const filename = `${Date.now()}-${ulid()}.${ext}`;
    const filepath = `${dir}/${filename}`;
    fs.writeFileSync(filepath, buffer);
    const imageUrl = `/api/post_images/${filename}`;

    // タグ名は最大32文字に切り詰め、重複を除去し、5件までに制限する
    const validTagNames = [
      ...new Set(tagNames.map((n) => n.trim().slice(0, 32)).filter(Boolean)),
    ].slice(0, MAX_TAGS);

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

    revalidatePath("/admin/posts");
    revalidatePath("/posts");

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
  userId,
}: {
  id: string;
  title: string;
  content: string;
  image?: File | null;
  isSalesApplication: boolean;
  tagNames?: string[];
  userId: string;
}) => {
  try {
    const [existingPost, user] = await Promise.all([
      prisma.post.findUnique({
        where: { id },
        select: { authorId: true, imageUrl: true },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      }),
    ]);

    if (!existingPost || !user) return false;

    // 認可チェック: 管理者であるか、投稿の所有者である場合のみ許可
    const isAdmin = user.role === "admin";
    const isAuthor = existingPost.authorId === userId;

    if (!isAdmin && !isAuthor) {
      console.warn(
        `Unauthorized update attempt by user ${userId} on post ${id}`,
      );
      return false;
    }

    let imageUrl: string | undefined;

    if (image) {
      // file-typeで拡張子を判定し、パストラバーサル等のリスクを排除
      const { fileTypeFromBuffer } = await import("file-type");
      const MIME_TO_EXT: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "webp",
      };
      const dir = `${process.cwd()}/public/img/posts`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileType = await fileTypeFromBuffer(buffer);
      if (!fileType || !MIME_TO_EXT[fileType.mime]) {
        console.error("Invalid image type:", fileType?.mime);
        return false;
      }
      const ext = MIME_TO_EXT[fileType.mime];
      const filename = `${Date.now()}-${ulid()}.${ext}`;
      const filepath = `${dir}/${filename}`;
      fs.writeFileSync(filepath, buffer);
      imageUrl = `/api/post_images/${filename}`;

      // 古い画像ファイルを削除
      if (existingPost?.imageUrl) {
        const oldFilename = existingPost.imageUrl.replace(
          "/api/post_images/",
          "",
        );
        const oldFilepath = `${dir}/${oldFilename}`;
        if (fs.existsSync(oldFilepath)) {
          fs.unlinkSync(oldFilepath);
        }
      }
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

    revalidatePath(`/admin/posts/${id}`);
    revalidatePath("/admin/posts");
    revalidatePath(`/posts/${id}`);
    revalidatePath("/posts");

    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    return false;
  }
};

export const deletePost = async ({ id }: { id: string }) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const currentUserId = session?.user.id;
    if (!currentUserId) return false;

    const [existingPost, user] = await Promise.all([
      prisma.post.findUnique({
        where: { id },
        select: { authorId: true, imageUrl: true },
      }),
      prisma.user.findUnique({
        where: { id: currentUserId },
        select: { role: true },
      }),
    ]);

    if (!existingPost || !user) return false;

    // 認可チェック: 管理者であるか、投稿の所有者である場合のみ許可
    const isAdmin = user.role === "admin";
    const isAuthor = existingPost.authorId === currentUserId;

    if (!isAdmin && !isAuthor) {
      console.warn(
        `Unauthorized delete attempt by user ${currentUserId} on post ${id}`,
      );
      return false;
    }

    // 投稿の削除と画像ファイルの削除を、DBの削除が成功した場合のみ実行するように順序を調整
    // (ファイルシステムはDBのトランザクションには含まれないため、DB削除を先行させる)
    await prisma.$transaction(async (tx) => {
      await tx.post.delete({
        where: { id },
      });
    });

    // DBからの削除が成功した後に、画像ファイルを削除
    if (existingPost.imageUrl) {
      const dir = path.join(process.cwd(), "public", "img", "posts");
      const raw = existingPost.imageUrl.replace("/api/post_images/", "");
      const filename = path.basename(raw);

      if (filename === raw) {
        const filepath = path.join(dir, filename);
        try {
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        } catch (e) {
          console.warn("Post deleted but image cleanup failed:", e);
        }
      } else {
        console.warn(
          "Skipped deleting unexpected image path:",
          existingPost.imageUrl,
        );
      }
    }

    revalidatePath("/admin/posts");
    revalidatePath("/posts");

    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};
