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
import { useParams, useRouter } from "next/navigation";
import useChat from "@/app/hooks/useChat";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
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

    const handleSelectConversation = async (
        conversation: Conversation
    ) => {
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
            console.error(
                "Failed to delete conversation:",
                error
            );
            throw error;
        }
    };

    const handleBackToWorkspace = () => {
        router.push(`/workspace/${workspaceId}`);
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
                <Box
                    sx={{
                        height: {
                            xs: 64,
                            sm: 72
                        },
                        minHeight: {
                            xs: 64,
                            sm: 72
                        },
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: {
                            xs: 2,
                            sm: 3
                        },
                        bgcolor: "#FFFFFF",
                        borderBottom: "1px solid",
                        borderColor: "divider"
                    }}
                >
                    <Tooltip title="Back to Workspace">
                        <IconButton
                            onClick={handleBackToWorkspace}
                            aria-label="Back to workspace"
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                color: "text.secondary",
                                flexShrink: 0,
                                "&:hover": {
                                    bgcolor: "action.hover",
                                    color: "text.primary"
                                }
                            }}
                        >
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 17,
                                sm: 19
                            },
                            fontWeight: 700,
                            color: "text.primary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {conversationTitle ||
                            "New Conversation"}
                    </Typography>
                </Box>

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
                        py: {
                            xs: 2,
                            sm: 3,
                            md: 4
                        }
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