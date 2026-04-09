import { Button, Stack, Typography } from "@mui/material";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { HeroImageClient } from "./Client";
import { ResolvedPickupPosts, ResolvedRecentPosts } from "./Resolved";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
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
        maxWidth={1200}
        width={"100%"}
        textAlign="left"
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
      </Stack>
      <Stack id="pickup" width={"100%"} maxWidth={1200}>
        <Typography variant="h4" align="left" mt={10} mb={5} fontWeight="bold">
          PickUp !
        </Typography>
        <ResolvedPickupPosts currentUserId={session?.user.id ?? null} />
      </Stack>
      <Stack id="recent" width={"100%"} maxWidth={1200}>
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
