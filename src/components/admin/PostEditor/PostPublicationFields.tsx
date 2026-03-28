"use client";

import { Checkbox, Stack, Typography } from "@mui/material";

export default function PostPublicationFields({
  isSalesApplication,
  salesAgreementChecked,
  tosChecked,
}: {
  isSalesApplication: boolean;
  salesAgreementChecked: boolean;
  setSalesAgreementChecked: (v: boolean) => void;
  tosChecked: boolean;
  setTosChecked: (v: boolean) => void;
  disabled: boolean;
}) {
  return (
    <Stack spacing={1} sx={{ opacity: 0.8 }}>
      {isSalesApplication && (
        <Stack direction="row" spacing={1} alignItems="start">
          <Checkbox checked={salesAgreementChecked} disabled size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            磁石祭2026の物販企画にて販売される可能性があること、その場合、運営からの連絡に対応する必要があることを理解しています。
          </Typography>
        </Stack>
      )}
      <Stack direction="row" spacing={1} alignItems="start">
        <Checkbox checked={tosChecked} disabled size="small" />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          利用規約とプライバシー・ポリシーに同意します。
        </Typography>
      </Stack>
    </Stack>
  );
}
