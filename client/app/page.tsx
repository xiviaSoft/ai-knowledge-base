"use client";

import { Box } from "@mui/material";
import useChat from "./hooks/useChat";
import { useState } from "react";

export default function Home() {
  const chat = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const hasMessages = chat.messages.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      
    </Box>
  );
}