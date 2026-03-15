"use server";

import fs from "node:fs";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

/**
 * プロフィール画像をアップロードしてURLを返す
 * @param image - アップロードするファイル
 * @returns 画像URL又はエラーメッセージ
 */
export const uploadProfileImage = async (
  image: File,
): Promise<{ imageUrl: string | null; error: string | null }> => {
  try {
    // 認証チェック
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return { imageUrl: null, error: "認証が必要です。" };
    }

    if (!image) {
      return { imageUrl: null, error: "画像が選択されていません。" };
    }

    if (!ALLOWED_MIME_TYPES.has(image.type)) {
      return { imageUrl: null, error: "対応していない画像形式です。" };
    }

    if (image.size > MAX_FILE_SIZE) {
      return { imageUrl: null, error: "画像サイズは5MB以下にしてください。" };
    }

    // バッファを取得
    const buffer = Buffer.from(await image.arrayBuffer());

    // MIME タイプをチェック
    const type = image.type;
    if (
      type !== "image/jpeg" &&
      type !== "image/png" &&
      type !== "image/webp" &&
      type !== "image/gif"
    ) {
      return {
        imageUrl: null,
        error: "アップロードしたファイルは有効な画像ではありません。",
      };
    }

    const dir = `${process.cwd()}/public/img/users`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 拡張子はサーバー側で確定（MIME タイプから取得）
    const extension = ALLOWED_MIME_TYPES.get(image.type);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${extension}`;
    const filepath = `${dir}/${filename}`;

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

/**
 * ユーザーのSlack表示名を更新する
 * @param userId - ユーザーID
 * @param slackName - 新しいSlack表示名
 * @param isDisplayname - Slackを表示するかどうか
 * @returns 成功時はtrue、失敗時はエラーメッセージ
 */
export const updateSlacksName = async (
  slackName: string,
  isDisplayname: boolean,
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user.id;
    if (!userId) {
      return { success: false, error: "認証が必要です。" };
    }

    if (!slackName.trim()) {
      return { success: false, error: "Slack表示名を入力してください。" };
    }

    await prisma.slacks.upsert({
      where: { userId },
      update: {
        name: slackName.trim(),
        isDisplayname,
      },
      create: {
        userId,
        name: slackName.trim(),
        isDisplayname,
      },
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to update slacks name:", error);
    return { success: false, error: "Slack設定の保存に失敗しました。" };
  }
};

/**
 * ログイン中ユーザーを自己BANしてアカウント削除相当の状態にする
 */
export const banSelfAccount = async (): Promise<{
  success: boolean;
  error: string | null;
}> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user.id;

    if (!userId) {
      return { success: false, error: "認証が必要です。" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        banned: true,
        banReason: "self-requested account deletion",
        banExpires: null,
      },
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to ban self account:", error);
    return {
      success: false,
      error: "アカウント削除に失敗しました。時間をおいて再度お試しください。",
    };
  }
};
