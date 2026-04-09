"use client";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#707070",
    },
  },
  typography: {
    fontFamily: ["a-otf-ud-shin-maru-go-pr6n"].join(","),
  },
});

export default function MUIWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
