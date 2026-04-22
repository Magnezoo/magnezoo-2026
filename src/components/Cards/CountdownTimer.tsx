"use client";

import { useEffect, useRef, useState } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<string>("読み込み中...");
  const requestRef = useRef<number>(null);
  const previousSecondRef = useRef<number>(0);
  const targetTime = new Date(targetDate).getTime();

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;
      const currentSecond = Math.floor(now / 1000);

      if (diff <= 0) {
        setTimeLeft("done");
        return;
      }

      // 初回実行時、または秒が変化した時のみ計算・更新
      if (
        previousSecondRef.current === 0 ||
        currentSecond !== previousSecondRef.current
      ) {
        previousSecondRef.current = currentSecond;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setTimeLeft(`${d}日 ${h}時間 ${m}分 ${s}秒`);
      }

      requestRef.current = requestAnimationFrame(updateTimer);
    };

    requestRef.current = requestAnimationFrame(updateTimer);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetTime]);

  if (timeLeft === "done") {
    return (
      <div className="text-2xl font-bold text-[#E48B00] py-2 animate-bounce">
        4/25～4/26まで、幕張メッセにて開催中！
      </div>
    );
  }

  return (
    <div className="text-2xl font-bold text-[#E48B00] py-2">{timeLeft}</div>
  );
}
