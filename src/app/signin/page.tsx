"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  SvgIcon,
} from "@mui/material";

const providers = [
  { id: "njr-google", label: "N中等部" },
  { id: "ned-google", label: "N高グループ" },
  { id: "nac-google", label: "角川ドワンゴ学園" },
];

function GoogleIcon() {
  return (
    <SvgIcon viewBox="0 0 48 48">
      <path
        d="M44.5 20H24v8.5h11.9C34.6 32.7 30 36 24 36c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.7 0 7.1 1.4 9.6 3.7l6.6-6.6C35.8 4 30.2 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22 22-9.8 22-22c0-1.5-.2-2.9-.5-4z"
        fill="#FFC107"
      />
      <path
        d="M6.3 14.9l7.3 5.4C15.9 17 19.7 14 24 14c3.7 0 7 1.4 9.6 3.7l6.6-6.6C35.8 4 30.2 2 24 2 15 2 7.1 6.9 6.3 14.9z"
        fill="#FF3D00"
      />
      <path
        d="M24 44c6 0 10.6-3.3 12.9-8.1l-6-4.9C30.9 34 27.6 35 24 35c-6 0-11.1-4-12.8-9.5l-7.4 5.7C7.9 38.8 15.9 44 24 44z"
        fill="#4CAF50"
      />
      <path
        d="M44.5 20H24v8.5h11.9C35 31.6 30 35 24 35c-6 0-11.1-4-12.8-9.5l-7.4 5.7C7.9 38.8 15.9 44 24 44c11.8 0 22-9.8 22-22 0-1.5-.2-2.9-.5-4z"
        fill="#1976D2"
      />
    </SvgIcon>
  );
}

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const redirect = searchParams?.redirect || "/";
  const router = useRouter();

  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (providerId: string) => {
    setError(null);
    setLoading(providerId);
    try {
      await authClient.signIn.oauth2({
        providerId,
        callbackURL: redirect,
      });
    } catch (e: unknown) {
      if (e && typeof e === "object" && "message" in e) {
        setError((e as Error).message);
      } else {
        setError(String(e));
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f6f7fb",
        p: 3,
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 480, borderRadius: 2, boxShadow: 4 }}
      >
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            サインイン
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Google アカウントでログインしてください。
          </Typography>

          <Button
            variant="text"
            onClick={() => router.push("/")}
            sx={{ mb: 2 }}
          >
            ホームに戻る
          </Button>

          <Stack spacing={2}>
            {providers.map((p) => (
              <Button
                key={p.id}
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSignIn(p.id)}
                disabled={loading !== null}
                fullWidth
              >
                {loading === p.id
                  ? "処理中..."
                  : `${p.label}のアカウントでサインイン`}
              </Button>
            ))}
          </Stack>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
