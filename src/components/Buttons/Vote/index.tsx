"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();

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
                  try {
                    const result = await toggleVote({
                      postId,
                      newState: !isVotedState,
                    });
                    setIsVotedState(result);
                    setVoteCount((voteCount) => voteCount + (result ? 1 : -1));
                  } catch (error) {
                    console.error("Error toggling vote:", error);
                    enqueueSnackbar("投票の切り替えに失敗しました。", {
                      variant: "error",
                    });
                    return;
                  }
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
