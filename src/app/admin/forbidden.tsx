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
      <Typography variant="h2">403 - Forbidden</Typography>
      <Typography>You are not authorized to access this resource.</Typography>
      <Typography>このページにアクセスする権限がありません。</Typography>
      <Link href="/" className="underline">
        Return Home →
      </Link>
    </Stack>
  );
}
