import Image from "next/image";

interface MediaTextProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price?: number; // 価格を追加（任意入力）
  description?: string;
  reverse?: boolean;
}

export default function MediaText({
  imageSrc,
  imageAlt,
  title,
  price,
  description,
  reverse = false,
}: MediaTextProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-stretch mb-12 bg-white/60 rounded-3xl border border-[#E48B00]/10 backdrop-blur-sm overflow-hidden shadow-sm ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-5/12 p-4 flex justify-center items-center bg-white/20">
        <div className="relative w-full aspect-4/3 overflow-hidden rounded-2xl border-2 border-[#E48B00]/80 bg-white/40">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-2"
          />
        </div>
      </div>
      <div className="w-full md:w-7/12 text-left p-8 flex flex-col justify-center">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-4">
          <h3 className="text-2xl font-bold text-[#E48B00]">{title}</h3>
        </div>
        <p className="text-black leading-relaxed whitespace-pre-wrap mb-6">
          {description}
        </p>
        {price !== undefined && (
          <div className="mt-auto">
            <span className="text-2xl font-bold text-[#e55a15]">
              ¥{price.toLocaleString()}
            </span>
            <span className="text-sm text-[#e55a15] ml-1"></span>
          </div>
        )}
      </div>
    </div>
  );
}
