import { Button, Stack, Typography } from "@mui/material";
import { headers } from "next/headers";
import PostButton from "@/components/Buttons/Post";
import { auth } from "@/lib/auth";
import { HeroImageClient } from "./Client";
import { ResolvedPickupPosts, ResolvedRecentPosts } from "./Resolved";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const maxWidth = 1400;
  const paddingX = 2;
  return (
    <Stack
      component={"main"}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      pb={10}
      spacing={5}
      sx={{
        backgroundColor: "#FFEECE",
      }}
    >
      <HeroImageClient />
      <Stack
        id="about"
        spacing={2}
        maxWidth={maxWidth}
        width={"100%"}
        textAlign="left"
        px={paddingX}
      >
        <Typography variant="h4" fontWeight="bold" align="left">
          「Magnezoo」とは？
        </Typography>
        <Typography variant="body1" align="left">
          「Magnezoo」は、<strong>みんなの自慢のウチの子を紹介する</strong>
          ためのプラットフォームです。
          <br />
          <strong>ウチの子のかわいい写真や特徴</strong>
          を投稿して、他のユーザーと共有しましょう！
        </Typography>
        <Stack alignItems="left">
          <PostButton
            userId={session?.user.id}
            className="bg-white border-2 border-black text-black font-bold py-4 px-12 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 text-lg cursor-pointer"
          />
        </Stack>
      </Stack>
      <Stack id="pickup" width={"100%"} maxWidth={maxWidth} px={paddingX}>
        <Typography variant="h4" align="left" mt={10} mb={5} fontWeight="bold">
          PickUp !
        </Typography>
        <ResolvedPickupPosts currentUserId={session?.user.id ?? null} />
      </Stack>
      <Stack id="recent" width={"100%"} maxWidth={maxWidth} px={paddingX}>
        <Typography variant="h4" align="left" mt={10} mb={5} fontWeight="bold">
          最近のポスト
        </Typography>
        <Typography variant="body1" align="left" mb={5}>
          みんなの新しい投稿をチェックしよう！
        </Typography>
        <ResolvedRecentPosts currentUserId={session?.user.id ?? null} />
        <Stack alignItems="center" mt={5}>
          <Button href="/posts" variant="contained" size="large" sx={{ mt: 3 }}>
            もっと見る
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
