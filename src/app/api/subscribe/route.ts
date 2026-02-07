import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, event } = await request.json();

    // バリデーション
    if (!email || !event) {
      return NextResponse.json(
        { error: "メールアドレスとイベントタイプが必要です" },
        { status: 400 },
      );
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 },
      );
    }

    // イベントタイプのバリデーション
    const validEvents = ["MAGNEZOO", "BOOTH"];
    if (!validEvents.includes(event)) {
      return NextResponse.json(
        { error: "無効なイベントタイプです" },
        { status: 400 },
      );
    }

    // 既に登録されているかチェック
    const existing = await prisma.eventStartSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 409 },
      );
    }

    // DB に保存
    const subscriber = await prisma.eventStartSubscriber.create({
      data: {
        email,
        event,
      },
    });

    return NextResponse.json(
      { success: true, id: subscriber.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}
