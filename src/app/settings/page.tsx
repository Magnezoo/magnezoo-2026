// import { Metadata } from "next/types";

// export const metadata: Metadata = {
//   title: "あなたのウチの子が商品に！？ - Magnezoo 物販企画",
//   description:
//     "Magnezoo物販企画(仮)は、生徒から募集した「ウチの子（ペット）」の写真をもとに制作する、ネット企画Magnezoo発の物販企画です。こちらから写真を応募できます。ここでしか手に入らない、尊くて愛しい限定アイテムを展開します。",
// };

export default async function SettingsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">個人設定</h1>
      <p className="text-lg text-gray-600">アカウント情報を編集します。</p>
    </div>
  );
}
