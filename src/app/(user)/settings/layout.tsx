"use client";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Header from "@/components/Header";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Header />
        <main className="max-w-5xl px-6 mx-auto mt-12 grid place-content-center">
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </main>
      </div>
    </ThemeProvider>
  );
}
