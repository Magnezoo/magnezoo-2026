"use server";

import fs from "node:fs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const uploadProfileImage = async (
  image: File,
): Promise<{ imageUrl: string | null; error: string | null }> => {
  try {
    if (!image) {
      return { imageUrl: null, error: "画像が選択されていません。" };
    }

    if (!ALLOWED_MIME_TYPES.has(image.type)) {
      return { imageUrl: null, error: "対応していない画像形式です。" };
    }

    if (image.size > MAX_FILE_SIZE) {
      return { imageUrl: null, error: "画像サイズは5MB以下にしてください。" };
    }

    const dir = `${process.cwd()}/public/img/users`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const safeName = image.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;
    const filepath = `${dir}/${filename}`;
    const buffer = Buffer.from(await image.arrayBuffer());

    fs.writeFileSync(filepath, buffer);

    return { imageUrl: `/img/users/${filename}`, error: null };
  } catch (error) {
    console.error("Failed to upload profile image:", error);
    return {
      imageUrl: null,
      error: "画像のアップロードに失敗しました。",
    };
  }
};
