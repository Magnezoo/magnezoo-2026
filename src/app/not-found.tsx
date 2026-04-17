import { Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack
      sx={{ minHeight: "100vh" }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
    >
      <Typography variant="h2">404 - Not Found</Typography>
      <Typography>The resource is not found.</Typography>
      <Typography>お探しのページは見つかりませんでした。</Typography>
      <Link href="/" className="underline">
        Return Home →
      </Link>
    </Stack>
  );
}
