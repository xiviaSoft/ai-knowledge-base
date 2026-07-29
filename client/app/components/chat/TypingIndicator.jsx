"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function TypingIndicator() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        my: 3,
      }}
    >
      <CircularProgress size={24} />

      <Typography color="text.secondary">
        AI is thinking...
      </Typography>
    </Box>
  );
}