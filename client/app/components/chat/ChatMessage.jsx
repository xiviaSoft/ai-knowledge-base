"use client";

import {
  Avatar,
  Box,
  Paper,
  Typography,
} from "@mui/material";

export default function ChatMessage({
  role,
  message,
}) {

  const isUser = role === "user";

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 3,
      }}
    >

      {!isUser && (
        <Avatar
          sx={{
            bgcolor: "#2563eb",
            mr: 2,
          }}
        >
          🤖
        </Avatar>
      )}

      <Paper
        elevation={3}
        sx={{
          maxWidth: "70%",
          p: 3,
          borderRadius: 3,
          bgcolor: isUser ? "#2563eb" : "white",
          color: isUser ? "white" : "black",
        }}
      >

        <Typography>

          {message}

        </Typography>

      </Paper>

      {isUser && (
        <Avatar
          sx={{
            ml: 2,
            bgcolor: "#0f172a",
          }}
        >
          👤
        </Avatar>
      )}

    </Box>

  );

}