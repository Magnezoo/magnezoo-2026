import { Stack } from "@mui/material";
import Image from "next/image";

export function HeroImageClient() {
  return (
    <Stack id="hero" alignItems="center" spacing={2} position="relative">
      <Image
        src="/img/kv_net.png"
        alt="Hero Image"
        width={1400}
        height={400}
        fetchPriority="high"
        preload
        sizes="(max-width: 768px) 100vw, (max-width: 1400px) 80vw, 1400px"
      />
      {/* TODO: スクロールを促すUIを入れる
      <div className="absolute top-4">
        <div className="scroll">
          <span>Scroll</span>
        </div>
      </div>
      */}
    </Stack>
  );
}
