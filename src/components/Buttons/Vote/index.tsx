"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { toggleVote } from "./action";

export default function VoteButton({
  postId,
  currentVoteCount,
  currentUserId,
  isVoted,
  disabled = false,
}: {
  postId: string;
  currentVoteCount: number;
  currentUserId: string | null;
  isVoted: boolean;
  disabled?: boolean;
}) {
  const [voteCount, setVoteCount] = useState(currentVoteCount);
  const [isVotedState, setIsVotedState] = useState(isVoted);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip
        title={
          currentUserId
            ? isVotedState
              ? "いいねを取り消す"
              : "いいねする"
            : "いいねするにはログインが必要です"
        }
        placement="top"
      >
        <button
          type="button"
          onClick={
            currentUserId
              ? async () => {
                  const newVoteCount = isVotedState
                    ? voteCount - 1
                    : voteCount + 1;
                  await toggleVote({ postId, currentUserId });
                  setVoteCount(newVoteCount);
                  setIsVotedState(!isVotedState);
                }
              : undefined
          }
          disabled={disabled || !currentUserId}
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
      </Tooltip>
      <Typography variant="body2" color="gray">
        {voteCount} いいね
      </Typography>
    </Stack>
  );
}
