"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { useState } from "react";
import type { SalesType } from "@/generated/prisma/client";
import { toggleVote } from "./action";

export default function VoteButton({
  postId,
  currentVoteCount,
  currentUserId,
  isVoted,
  disabled = false,
  isSalesApplication = false,
  salesType = null,
}: {
  postId: string;
  currentVoteCount: number;
  currentUserId: string | null;
  isVoted: boolean;
  disabled?: boolean;
  isSalesApplication?: boolean;
  salesType?: SalesType | null;
}) {
  const [voteCount, setVoteCount] = useState(currentVoteCount);
  const [isVotedState, setIsVotedState] = useState(isVoted);
  const { enqueueSnackbar } = useSnackbar();

  const voteLabel = isSalesApplication ? "投票" : "いいね";

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip
        title={
          currentUserId
            ? isVotedState
              ? `${voteLabel}を取り消す`
              : `${voteLabel}する`
            : `${voteLabel}するにはログインが必要です`
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
                      isSalesApplication,
                      salesType,
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
        {voteCount} {isSalesApplication ? "票" : "いいね"}
      </Typography>
    </Stack>
  );
}
