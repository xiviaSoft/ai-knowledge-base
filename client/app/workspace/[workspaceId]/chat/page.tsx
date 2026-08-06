"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import ChatLayout from "@/app/components/chat/ChatLayout";
import ConversationSidebar from "@/app/components/chat/ConversationSidebar";
import ChatHeader from "@/app/components/chat/ChatHeader";
import MessageList from "@/app/components/chat/MessageList";
import ChatInput from "@/app/components/chat/ChatInput";
import EmptyChat from "@/app/components/chat/EmptyChat";
import { Box } from "@mui/material";

export default function ChatPage() {

    const { workspaceId } = useParams();

    const [messages, setMessages] = useState<any[]>([]);

    const [conversations, setConversations] = useState<any[]>([]);

    const [selectedConversation, setSelectedConversation] = useState<any>(null);

    function createConversation() {

        setSelectedConversation(null);

        setMessages([]);

    }

    async function handleSend(text: string) {

        const userMessage = {

            id: Date.now(),

            role: "USER",

            content: text

        };

        setMessages((prev) => [

            ...prev,

            userMessage

        ]);

        // Backend integration will be added next
    }

    return (

        <Box
            sx={{
                display: "flex",
                height: "100%",
                overflow: "hidden",
                bgcolor: "#F6F8FC"
            }}
        >

            <ConversationSidebar

                conversations={conversations}

                workspaceId={workspaceId}

                onNewChat={createConversation}

            />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <ChatHeader

                    title={

                        selectedConversation?.title ||

                        "New Conversation"

                    }

                />

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: 5,
                        py: 4
                    }}
                >

                    {

                        messages.length === 0 ? (

                            <EmptyChat />

                        ) : (

                            <MessageList

                                messages={messages}

                            />

                        )

                    }

                </Box>

                <ChatInput

                    onSend={handleSend}

                />

            </Box>

        </Box>

    );

}