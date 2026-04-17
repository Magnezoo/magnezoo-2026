"use client";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { authClient } from "@/lib/auth-client";

export default function NewUserPage() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  return (
    <Stack direction={"column"} spacing={2}>
      <Typography variant="h4">新規ユーザー作成</Typography>
      <Stack
        direction="column"
        spacing={2}
        component={"form"}
        action={async (formdata: FormData) => {
          try {
            await authClient.admin.createUser({
              name: formdata.get("name") as string,
              email: formdata.get("email") as string,
              password: formdata.get("password") as string,
              role: "user",
            });
            enqueueSnackbar("ユーザーが作成されました", { variant: "success" });
            router.push("/admin/users");
          } catch (error) {
            console.log(error);
            enqueueSnackbar("ユーザーの作成に失敗しました", {
              variant: "error",
            });
          }
        }}
      >
        <TextField name="name" label="名前" fullWidth required />
        <TextField
          name="email"
          label="メールアドレス"
          fullWidth
          required
          type="email"
        />
        <TextField
          name="password"
          label="パスワード"
          type="password"
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          作成
        </Button>
      </Stack>
    </Stack>
  );
}
