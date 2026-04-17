import { Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Forbidden() {
  return (
    <Stack
      sx={{ minHeight: "100vh" }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
    >
      <Typography variant="h2">401 - Unauthorized</Typography>
      <Typography>Please log in to access this page.</Typography>
      <Typography>
        このページにアクセスするためにはログインが必要です。
      </Typography>
      <Link href="/signin" className="underline">
        Signin Page →
      </Link>
    </Stack>
  );
}
