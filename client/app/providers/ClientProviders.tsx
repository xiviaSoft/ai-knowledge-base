"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "../contexts/AuthContext";
import typography from "../theme/typography";
import components from "../theme/components";
import { CssBaseline } from "@mui/material";
import palette from "../theme/palette";
import shadows from "../theme/shadows";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const theme = createTheme({ palette, typography, shadows, components });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
