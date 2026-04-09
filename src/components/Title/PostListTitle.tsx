"use client";

import { Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

const CharactorSize = 130;

export default function PostListTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  console.log("isMobile", isMobile);
  return (
    <Stack direction={"row"} alignItems="center" spacing={4}>
      {isMobile ? null : (
        <Image
          src="/img/char1.png"
          alt="Character 1"
          width={CharactorSize}
          height={CharactorSize}
        />
      )}
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant={"body1"}>{subtitle}</Typography>
      </Stack>
      {isMobile ? null : (
        <Image
          src="/img/char2.png"
          alt="Character 2"
          width={CharactorSize}
          height={CharactorSize}
        />
      )}
    </Stack>
  );
}
