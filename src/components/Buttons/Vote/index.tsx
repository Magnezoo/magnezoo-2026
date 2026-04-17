"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
import type { SalesType } from "@/generated/prisma/client";
import { toggleVote } from "./action";

export default function VoteButton({
  postId,
  currentVoteCount,
  currentUserId,
  isVoted,
  isStudio = false,
  studioMgntNo = undefined,
  title = undefined,
  disabled = false,
  isSalesApplication = false,
  salesType = null,
}: {
  postId: string;
  currentVoteCount: number;
  currentUserId: string | null;
  isVoted: boolean;
  isStudio?: boolean;
  studioMgntNo?: number;
  title?: string;
  disabled?: boolean;
  isSalesApplication?: boolean;
  salesType?: SalesType | null;
}) {
  const [voteCount, setVoteCount] = useState(currentVoteCount);
  const [isVotedState, setIsVotedState] = useState(isVoted);
  const { enqueueSnackbar } = useSnackbar();

  const voteLabel = isSalesApplication ? "投票" : "いいね";

  const urlEncodedFormLabel =
    studioMgntNo && isStudio ? encodeURIComponent(`「${title}」`) : undefined;
  const formURL =
    studioMgntNo && isStudio
      ? `https://docs.google.com/forms/d/e/1FAIpQLSc2Hf5Itzp7QZPdzNFRYIXUzeUYLm76YGQHeSzsbR5qFsMPIQ/viewform?usp=pp_url&entry.574807429=No.${studioMgntNo}+${urlEncodedFormLabel}`
      : `https://forms.gle/8NuR57dDeUKrGCfq8`;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip
        title={
          isStudio
            ? `投票フォームへ`
            : currentUserId
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
            isStudio
              ? () => window.location.assign(formURL)
              : currentUserId
                ? async (e) => {
                    e.stopPropagation();
                    try {
                      const result = await toggleVote({
                        postId,
                        newState: !isVotedState,
                        isSalesApplication,
                        salesType,
                      });
                      setIsVotedState(result);
                      setVoteCount(
                        (voteCount) => voteCount + (result ? 1 : -1),
                      );
                    } catch (error) {
                      console.error("Error toggling vote:", error);
                      enqueueSnackbar("投票の切り替えに失敗しました。", {
                        variant: "error",
                      });
                      return;
                    }
                  }
                : (e) => e.stopPropagation()
          }
          disabled={(disabled || !currentUserId) && isStudio}
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
      {isStudio ? (
        <Typography
          variant="body2"
          color="gray"
          component={Link}
          href={formURL}
          sx={{
            textDecoration: "underline",
          }}
        >
          投票フォームへ
        </Typography>
      ) : (
        <Typography variant="body2" color="gray">
          {voteCount} {isSalesApplication ? "票" : "いいね"}
        </Typography>
      )}
    </Stack>
  );
}
