"use client";

import { useState } from "react";

import {
  Box,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";

export default function ChatInput({
  sendMessage,
  loading,
}) {
  const [question, setQuestion] = useState("");

  const submit = () => {
    if (!question.trim()) return;

    sendMessage(question);

    setQuestion("");
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.default",
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          borderRadius: "18px",
          border: "1px solid",
          borderColor: "divider",
          transition: ".3s",

          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 4px rgba(37,99,235,.12)",
          },
        }}
      >
        <Tooltip title="Upload PDF (Coming Soon)">
          <IconButton>
            <AttachFileRoundedIcon />
          </IconButton>
        </Tooltip>

        <TextField
          fullWidth
          multiline
          maxRows={6}
          variant="standard"
          placeholder="Ask anything..."
          value={question}
          disabled={loading}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        //   InputProps={{
        //     disableUnderline: true,
        //   }}
        />

        <Tooltip title="Voice (Coming Soon)">
          <IconButton>
            <MicNoneRoundedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Send">
          <IconButton
            onClick={submit}
            disabled={loading}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              ml: 1,

              "&:hover": {
                bgcolor: "primary.dark",
              },

              "&:disabled": {
                bgcolor: "grey.400",
              },
            }}
          >
            <SendRoundedIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </Box>
  );
}