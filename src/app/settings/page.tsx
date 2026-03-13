// import { Metadata } from "next/types";

import Typography from "@mui/material/Typography";
import { headers } from "next/headers";
import SettingsForm from "@/components/Forms/Settings";
import { auth } from "@/lib/auth";

// export const metadata: Metadata = {
//   title: "あなたのウチの子が商品に！？ - Magnezoo 物販企画",
//   description:
//     "Magnezoo物販企画(仮)は、生徒から募集した「ウチの子（ペット）」の写真をもとに制作する、ネット企画Magnezoo発の物販企画です。こちらから写真を応募できます。ここでしか手に入らない、尊くて愛しい限定アイテムを展開します。",
// };

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return <Typography>ログイン情報の取得に失敗しました。</Typography>;
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        個人設定
      </Typography>
      <Typography variant="subtitle1" className="text-gray-600" gutterBottom>
        アカウント情報を編集します。
      </Typography>
      <div className="mt-6">
        <SettingsForm
          initialName={user.name ?? ""}
          initialImage={user.image ?? null}
        />
      </div>
    </div>
  );
}
