"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, Stack, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useState } from "react";

export default function VoteButton({
  postId,
  currentVoteCount,
  isVoted,
  disabled = false,
}: {
  postId: string;
  currentVoteCount: number;
  isVoted: boolean;
  disabled?: boolean;
}) {
  const [voteCount, setVoteCount] = useState(currentVoteCount);
  const [isVotedState, setIsVotedState] = useState(isVoted);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <button
        type="button"
        onClick={() => {
          const newVoteCount = isVotedState ? voteCount - 1 : voteCount + 1;
          setVoteCount(newVoteCount);
          setIsVotedState(!isVotedState);
        }}
        disabled={disabled}
        className={"cursor-pointer"}
      >
        <Avatar
          sx={{
            bgcolor: "white",
            border: "1px solid",
            borderColor: "divider",
            width: 32,
            height: 32,
          }}
        >
          {isVotedState ? (
            <FavoriteIcon sx={{ color: pink[300] }} />
          ) : (
            <FavoriteBorderIcon color="disabled" />
          )}
        </Avatar>
      </button>
      <Typography variant="body2" color="gray">
        {voteCount} いいね
      </Typography>
    </Stack>
  );
}
