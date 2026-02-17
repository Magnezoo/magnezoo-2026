"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-04-10T19:00:00");
const EARLY_ACCESS_DATE = new Date("2026-02-25T09:00:00");

const events = [
  {
    id: "online",
    title: "Magnezoo 〜みんなのウチの子決定戦！〜",
    thumbnail: "/img/thumbnail/online.png",
    description:
      "あなたのウチの子が主役になる！自慢のペット写真を投稿して、オンライン会場で展示＆投票！犬猫から爬虫類まで、なんでもOK！最強に尊い「ウチの子No.1」を決めよう🐾✨",
    eventType: "MAGNEZOO",
    targetTime: new Date("2026-04-10T00:00:00"),
  },
  {
    id: "booth",
    title: "Magnezoo 物販企画(仮)",
    thumbnail: "/img/thumbnail/booth.png",
    description:
      "生徒から募集した「ウチの子（ペット）」の写真をもとに制作する、ネット企画Magnezoo発の物販企画です。ここでしか手に入らない、尊くて愛しい限定アイテムを展開します。写真募集開始までお待ちください！",
    eventType: "BOOTH",
    targetTime: new Date("2026-04-25T10:00:00"),
    earlyAccessTime: new Date("2026-02-25T09:00:00"),
  },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function SubscriptionModal({
  isOpen,
  onClose,
  eventTitle,
  eventType,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventType: string;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, event: eventType }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setMessage("登録しました！通知をお待ちください。");
        setEmail("");
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
        }, 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.error || "登録に失敗しました。");
      }
    } catch {
      setIsSuccess(false);
      setMessage("エラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-zinc-800 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          通知を受け取る
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          {eventTitle} の開始時刻にメール通知を受け取ります。
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 px-4 py-2 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-3 text-sm font-medium ${
                isSuccess
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            送信することにより、
            <Link
              href="/privacy"
              className="inline text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              プライバシー・ポリシー
            </Link>
            に同意したものと見なします。
          </p>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-black text-white px-4 py-2 font-medium hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
            >
              {isLoading ? "登録中..." : "登録"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-50 px-4 py-2 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  const openedEvent = events.find((e) => e.id === openModal);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900 font-sans px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
        イベントまで待機
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        開催日時: {TARGET_DATE.toLocaleString()}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-12">
        物販募集開始日時: {EARLY_ACCESS_DATE.toLocaleString()}
      </p>
      <p className="text-base text-zinc-700 dark:text-zinc-300 mb-12 leading-relaxed max-w-2xl text-center">
        磁石祭 ZEROのオンライン企画 Magnezooが今年も開催されます！
        <br />
        昨年に加え、今年は物販企画も実施予定です。 奮ってご参加ください！
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const isBeforeEarlyAccess =
            event.earlyAccessTime && now < event.earlyAccessTime;
          const countdownTarget = isBeforeEarlyAccess
            ? event.earlyAccessTime!
            : event.targetTime;
          const countdownLabel = isBeforeEarlyAccess
            ? "募集開始まで"
            : "イベント開始まで";

          return (
            <div
              key={event.id}
              className="rounded-2xl bg-white dark:bg-zinc-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {event.title}
                  </h2>
                  <div className="mb-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        event.eventType === "MAGNEZOO"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      }`}
                    >
                      {event.eventType === "MAGNEZOO"
                        ? "オンライン"
                        : "オフライン"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="mb-6">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                      {countdownLabel}
                    </p>
                    <CountdownTimer targetDate={countdownTarget} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setOpenModal(event.id)}
                      className="w-full rounded-lg bg-black text-white px-4 py-2 font-medium hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      通知を受け取る
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-400 text-center">
        開始までしばらくお待ちください ✨
      </p>

      {openedEvent && (
        <SubscriptionModal
          isOpen={openModal !== null}
          onClose={() => setOpenModal(null)}
          eventTitle={openedEvent.title}
          eventType={openedEvent.eventType}
        />
      )}
      <footer>
        <p className="mt-12 text-xs text-zinc-400 text-center">
          &copy; 2026 Magnezoo 製作委員会 All rights reserved. Server provided
          by by{" "}
          <Link
            href="https://uniproject.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
          >
            デジタル創作サークルUniProject
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex flex-col items-center">
        <div className="rounded-md bg-zinc-100 dark:bg-zinc-700 px-2 py-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {days}
        </div>
        <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
          日
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-md bg-zinc-100 dark:bg-zinc-700 px-2 py-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {pad(hours)}
        </div>
        <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
          時
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-md bg-zinc-100 dark:bg-zinc-700 px-2 py-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {pad(minutes)}
        </div>
        <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
          分
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-md bg-zinc-100 dark:bg-zinc-700 px-2 py-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {pad(seconds)}
        </div>
        <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
          秒
        </div>
      </div>
    </div>
  );
}
