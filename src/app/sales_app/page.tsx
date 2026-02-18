import Link from "next/link";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="bg-white/90 rounded-2xl border border-[#E48B00]/20 px-10 py-10 text-black">
        <h2 className="text-xl font-bold mb-4 text-[#E48B00]">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function SalesAppCampainPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FFEECE] font-sans text-black py-10 overflow-hidden">
      {/* 幾何学的な背景アニメーション */}
      <div className="animated-bg-circles" aria-hidden="true">
        <div className="circle circle1" />
        <div className="circle circle2" />
        <div className="circle circle3" />
        <div className="circle circle4" />
        <div className="circle circle5" />
      </div>
      <main className="relative w-full max-w-4xl mx-auto px-2 text-center leading-relaxed z-10">
        <header className="mb-8">
          <div className="bg-white/95 rounded-2xl border border-[#E48B00]/20 px-10 py-8 mb-2">
            <h1 className="text-2xl font-bold mb-2 text-[#E48B00]">
              【物販企画】
            </h1>
            <h2 className="text-3xl font-bold mb-0 text-[#E48B00]">
              あなたのウチの子が商品に！？
            </h2>
          </div>
        </header>

        <Section title="企画概要">
          <p className="mb-2 leading-normal [&_span]:inline-block max-w-xl mx-auto">
            <span>
              <span>
                <span>Magnezoo物販企画(仮)は、</span>
                <span>生徒から募集した</span>
              </span>
              <span>
                <span>「ウチの子（ペット）」の</span>
                <span>写真をもとに</span>
                <span>制作する、</span>
              </span>
              <span>
                <span>ネット企画Magnezoo発の</span>
                <span>物販企画です。</span>
              </span>
              <span>
                <span>ここでしか手に入らない、</span>
                <span>
                  <span>尊くて愛しい</span>限定アイテムを
                </span>
              </span>
              <span>展開します。</span>
            </span>
          </p>
        </Section>

        <Section title="写真の応募方法">
          <p className="mb-4">
            この企画は、
            <br />
            <span className="font-bold text-[#E48B00]">
              生徒から募集した「ウチの子（ペット）」の写真をもとに制作されます。
            </span>
            <br />
            応募方法は以下の通りです。
          </p>
          <ol className="list-inside list-none text-left mx-auto max-w-md space-y-4">
            <li className="whitespace-nowrap">
              <span className="font-bold">1. 写真を撮る：</span>
              <br />
              あなたのウチの子（ペット等）のかわいい写真を撮影してください。
              <br />
              できるだけ高画質で、正方形にカットできるような構図が望ましいです。
              <br />
              <span className="font-bold text-[#E48B00]">
                地域猫や犬カフェ・猫カフェ等の写真も歓迎します！
              </span>
            </li>
            <li className="whitespace-nowrap">
              <span className="font-bold list-none">
                2. 応募フォームに記入する：
              </span>
              <br />
              以下の応募フォームに必要事項を記入してください。
            </li>
            <li className="whitespace-nowrap">
              <span className="font-bold list-none">
                3. 写真をアップロードする：
              </span>
              <br />
              応募フォーム内で、撮影した写真をアップロードしてください。
            </li>
            <li className="whitespace-nowrap">
              <span className="font-bold list-none">4. 送信する：</span>
              <br />
              すべての情報が入力されたら、応募フォームを送信してください。
            </li>
          </ol>
          <p className="mt-6">
            応募された写真は、企画チームによって選定され、商品化される可能性があります。
            <br />
            選ばれた方には、後日ご連絡いたします。
          </p>
        </Section>

        <Section title="注意事項">
          <ul className="list-disc list-inside text-left mx-auto max-w-md space-y-2">
            <li className="whitespace-nowrap">
              応募は<span className="font-bold text-[#E48B00]">何回でもOK</span>
              です！
            </li>
            <li className="whitespace-nowrap">
              写真はオリジナルのもので、他人の著作権を侵害しないものに限ります。
              <ul className="list-[circle] ml-6 space-y-1">
                <li>人が写っている写真は望ましくありません。</li>
                <li>
                  <span className="font-bold text-[#E48B00]">
                    猫カフェや犬カフェ等の写真も歓迎します。
                  </span>
                  <br />
                  ただし、他のお客さん等が写り込まないように注意してください。
                </li>
              </ul>
            </li>
            <li className="whitespace-nowrap">
              選ばれた写真は、商品化のために加工されることがあります。
            </li>
            <li className="whitespace-nowrap">
              応募された写真は返却いたしませんので、ご了承ください。
            </li>
          </ul>
        </Section>

        {/* TODO: 応募フォームのボタン追加 */}
        <div className="flex flex-col items-center py-10">
          <button className="bg-white border-2 border-black text-black font-bold py-4 px-12 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 text-lg cursor-pointer">
            応募フォームはこちら
          </button>
        </div>
        <div className="mt-12">
          {/* TODO: 大きく目立つようにする */}
          <p className="text-[#E48B00] text-2xl font-semibold tracking-wide">
            みなさんのご応募をお待ちしております！
          </p>
        </div>
      </main>
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
