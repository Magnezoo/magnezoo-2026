"use client";

import { Checkbox, Stack, Switch, Typography } from "@mui/material";

export default function PostPublicationFields({
  isSalesApplication,
  salesAgreementChecked,
  setSalesAgreementChecked,
  tosChecked,
  setTosChecked,
  disabled,
  isStudio,
  setIsStudio,
  isStudioDisabled = true,
}: {
  isSalesApplication: boolean;
  salesAgreementChecked: boolean;
  setSalesAgreementChecked: (v: boolean) => void;
  tosChecked: boolean;
  setTosChecked: (v: boolean) => void;
  disabled: boolean;
  isStudio?: boolean;
  setIsStudio?: (v: boolean) => void;
  isStudioDisabled?: boolean;
}) {
  return (
    <Stack spacing={1} sx={{ opacity: 0.8 }}>
      {typeof isStudio === "boolean" && setIsStudio && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ p: 1.5, borderRadius: 1, backgroundColor: "action.hover" }}
        >
          <Switch
            checked={isStudio}
            onChange={(e) => setIsStudio(e.target.checked)}
            disabled={isStudioDisabled}
            size="small"
          />
          <Typography variant="body2" color="text.primary" fontWeight={700}>
            投稿の種類を「Studio」に設定する
          </Typography>
        </Stack>
      )}
      {isSalesApplication && (
        <Stack direction="row" spacing={1} alignItems="start">
          <Checkbox
            checked={salesAgreementChecked}
            onChange={(e) => setSalesAgreementChecked(e.target.checked)}
            disabled={disabled}
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            磁石祭2026の物販企画にて販売される可能性があること、その場合、運営からの連絡に対応する必要があることを理解しています。
          </Typography>
        </Stack>
      )}
      <Stack direction="row" spacing={1} alignItems="start">
        <Checkbox
          checked={tosChecked}
          onChange={(e) => setTosChecked(e.target.checked)}
          disabled={disabled}
          size="small"
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          利用規約とプライバシー・ポリシーに同意します。
        </Typography>
      </Stack>
    </Stack>
  );
}
