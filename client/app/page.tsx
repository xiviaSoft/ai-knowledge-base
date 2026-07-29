"use client";

import { Box } from "@mui/material";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/common/Header";
import ChatWindow from "./components/chat/ChatWindow";
import ChatInput from "./components/chat/ChatInput";

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
      <Sidebar open={sidebarOpen}  />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header open={sidebarOpen}
          setOpen={setSidebarOpen} />

        {hasMessages ? (
          <>
            <ChatWindow
              messages={chat.messages}
              loading={chat.loading}
            />

            <ChatInput
              sendMessage={chat.sendMessage}
              loading={chat.loading}
            />
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 3,
            }}
          >
            <ChatInput
              sendMessage={chat.sendMessage}
              loading={chat.loading}
              
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}