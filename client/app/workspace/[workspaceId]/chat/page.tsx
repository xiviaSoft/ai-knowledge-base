"use client";
import ConversationSidebar from "@/app/components/chat/ConversationSidebar";
import type { Conversation } from "@/app/components/chat/ConversationSidebar";
import TypingIndicator from "@/app/components/chat/TypingIndicator";
import MessageList from "@/app/components/chat/MessageList";
import ChatHeader from "@/app/components/chat/ChatHeader";
import EmptyChat from "@/app/components/chat/EmptyChat";
import ChatInput from "@/app/components/chat/ChatInput";
import chatService from "@/app/services/chat.service";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import useChat from "@/app/hooks/useChat";
import { Box } from "@mui/material";
export default function ChatPage() {
    const params = useParams();
    const workspaceId = params.workspaceId as string;
    const [refreshKey, setRefreshKey] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const {
        messages,
        loading,
        conversationId,
        conversationTitle,
        sendMessage,
        newConversation,
        loadConversation
    } = useChat(workspaceId, {
        onConversationCreated: () => {
            setRefreshKey((prev) => prev + 1);
        }
    });
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);
    const handleNewChat = () => {
        newConversation();
    };
    const handleSelectConversation = async (conversation: Conversation) => {
        await loadConversation(conversation);
    };
    const handleDeleteConversation = async (id: string) => {
        try {
            await chatService.deleteConversation(id);
            if (conversationId === id) {
                newConversation();
            }
            setRefreshKey((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to delete conversation:", error);
            throw error;
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                minHeight: 0,
                overflow: "hidden",
                bgcolor: "#F6F8FC"
            }}
        >
            <ConversationSidebar
                workspaceId={workspaceId}
                activeConversationId={conversationId}
                refreshKey={refreshKey}
                onNewChat={handleNewChat}
                onSelectConversation={handleSelectConversation}
                onDeleteConversation={handleDeleteConversation}
            />
            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <ChatHeader title={conversationTitle} />
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        overflowX: "hidden",
                        px: {
                            xs: 2,
                            sm: 3,
                            md: 5
                        },
                        py: 4
                    }}
                >
                    {messages.length === 0 ? (
                        loading ? (
                            <TypingIndicator />
                        ) : (
                            <EmptyChat />
                        )
                    ) : (
                        <>
                            <MessageList messages={messages} />
                            {loading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </Box>
                <ChatInput
                    onSend={sendMessage}
                    disabled={loading}
                />
            </Box>
        </Box>
    );
}