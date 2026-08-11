"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Box } from "@mui/material";

import ConversationSidebar
    from "@/app/components/chat/ConversationSidebar";

import MessageList
    from "@/app/components/chat/MessageList";

import ChatHeader
    from "@/app/components/chat/ChatHeader";

import EmptyChat
    from "@/app/components/chat/EmptyChat";

import ChatInput
    from "@/app/components/chat/ChatInput";

import useChat
    from "@/app/hooks/useChat";

import chatService
    from "@/app/services/chat.service";

import type {
    Conversation
} from "@/app/components/chat/ConversationSidebar";


export default function ChatPage() {

    const params = useParams();

    const workspaceId =
        params.workspaceId as string;


    const [
        refreshKey,
        setRefreshKey
    ] = useState(0);


    const {
        messages,
        loading,
        conversationId,
        conversationTitle,
        sendMessage,
        newConversation,
        loadConversation
    } = useChat(
        workspaceId,
        {
            onConversationCreated: () => {

                setRefreshKey(
                    (prev) => prev + 1
                );

            }
        }
    );


    /*
     * New conversation.
     */
    const handleNewChat = () => {

        newConversation();

    };


    /*
     * Select existing conversation.
     */
    const handleSelectConversation = async (
        conversation: Conversation
    ) => {

        await loadConversation(
            conversation
        );

    };


    /*
     * Delete conversation.
     */
    const handleDeleteConversation = async (
        id: string
    ) => {

        try {

            await chatService.deleteConversation(
                id
            );


            /*
             * If the deleted conversation
             * is currently active,
             * return to new conversation.
             */
            if (
                conversationId === id
            ) {

                newConversation();

            }


            /*
             * Refresh sidebar.
             */
            setRefreshKey(
                (prev) => prev + 1
            );

        } catch (error) {

            console.error(
                "Failed to delete conversation:",
                error
            );

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

            {/* Conversation Sidebar */}

            <ConversationSidebar

                workspaceId={
                    workspaceId
                }

                activeConversationId={
                    conversationId
                }

                refreshKey={
                    refreshKey
                }

                onNewChat={
                    handleNewChat
                }

                onSelectConversation={
                    handleSelectConversation
                }

                onDeleteConversation={
                    handleDeleteConversation
                }

            />


            {/* Main Chat */}

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {/* Header */}

                <ChatHeader
                    title={
                        conversationTitle
                    }
                />


                {/* Messages */}

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

                        <EmptyChat />

                    ) : (

                        <MessageList
                            messages={
                                messages
                            }
                        />

                    )}

                </Box>


                {/* Input */}

                <ChatInput

                    onSend={
                        sendMessage
                    }

                    disabled={
                        loading
                    }

                />

            </Box>

        </Box>
    );
}