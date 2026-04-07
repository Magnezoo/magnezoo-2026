"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { usePathname, useRouter } from "next/navigation";

export default function PostFilterToggle({
  size = "medium",
}: {
  size?: "small" | "medium" | "large";
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isMyPosts = pathname === "/posts/my";

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    if (newValue !== null) {
      if (newValue === "my") {
        router.push("/posts/my");
      } else {
        router.push("/posts");
      }
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={isMyPosts ? "my" : "all"}
      exclusive
      onChange={handleChange}
      aria-label="Post filter"
      size={size}
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        "& .MuiToggleButton-root": {
          px: 3,
          py: 1,
          fontWeight: "bold",
        },
      }}
    >
      <ToggleButton value="all" aria-label="all posts">
        <GroupsIcon sx={{ mr: 1 }} />
        みんなの投稿
      </ToggleButton>
      <ToggleButton value="my" aria-label="my posts">
        <PersonIcon sx={{ mr: 1 }} />
        自分の投稿
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
