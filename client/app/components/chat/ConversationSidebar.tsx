"use client";

import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    CircularProgress,
    IconButton,
    Tooltip
} from "@mui/material";

import ChatBubbleOutlineRoundedIcon
    from "@mui/icons-material/ChatBubbleOutlineRounded";

import DeleteOutlineRoundedIcon
    from "@mui/icons-material/DeleteOutlineRounded";

import AddRoundedIcon
    from "@mui/icons-material/AddRounded";

import chatService from "@/app/services/chat.service";


export interface Conversation {
    id: string;
    title: string;
    created_at?: string;
    updated_at?: string;
}


interface ConversationSidebarProps {
    workspaceId: string;

    activeConversationId?: string | null;

    refreshKey?: number;

    onNewChat: () => void;

    onSelectConversation: (
        conversationId: Conversation
    ) => void;

    onDeleteConversation: (
        conversationId: string
    ) => Promise<void> | void;
}


export default function ConversationSidebar({
    workspaceId,
    activeConversationId,
    refreshKey,
    onNewChat,
    onSelectConversation,
    onDeleteConversation
}: ConversationSidebarProps) {

    const [
        conversations,
        setConversations
    ] = useState<Conversation[]>([]);

    const [
        loading,
        setLoading
    ] = useState(true);


    /*
     * Load conversations.
     */
    const loadConversations = async () => {

        if (!workspaceId) {
            return;
        }

        try {

            setLoading(true);

            const response =
                await chatService.getConversations(
                    workspaceId
                );

            setConversations(response);

        } catch (error) {

            console.error(
                "Failed to load conversations:",
                error
            );

            setConversations([]);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadConversations();

    }, [
        workspaceId,
        refreshKey
    ]);


    /*
     * Delete conversation.
     */
    const handleDelete = async (
        event: React.MouseEvent,
        conversationId: string
    ) => {

        event.stopPropagation();

        try {

            await onDeleteConversation(
                conversationId
            );

            setConversations(
                (prev) =>
                    prev.filter(
                        (conversation) =>
                            conversation.id !==
                            conversationId
                    )
            );

        } catch (error) {

            console.error(
                "Delete conversation failed:",
                error
            );

        }
    };


    return (
        <Box
            sx={{
                width: 300,
                flexShrink: 0,
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                bgcolor: "#FFFFFF",
                borderRight:
                    "1px solid #E5E7EB"
            }}
        >

            {/* Header */}

            <Box
                sx={{
                    p: 2.5
                }}
            >

                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 700
                    }}
                >
                    Conversations
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={
                        <AddRoundedIcon />
                    }
                    onClick={onNewChat}
                    sx={{
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1.2
                    }}
                >
                    New Chat
                </Button>

            </Box>


            <Divider />


            {/* Conversation list */}

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    px: 1.5,
                    py: 1.5
                }}
            >

                {loading ? (

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 4
                        }}
                    >
                        <CircularProgress
                            size={24}
                        />
                    </Box>

                ) : conversations.length === 0 ? (

                    <Box
                        sx={{
                            textAlign: "center",
                            py: 5,
                            px: 2
                        }}
                    >

                        <ChatBubbleOutlineRoundedIcon
                            sx={{
                                fontSize: 36,
                                color: "#9CA3AF",
                                mb: 1
                            }}
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No conversations yet.
                        </Typography>

                    </Box>

                ) : (

                    <List disablePadding>

                        {conversations.map(
                            (conversation) => (

                                <ListItemButton
                                    key={
                                        conversation.id
                                    }

                                    selected={
                                        activeConversationId ===
                                        conversation.id
                                    }

                                    onClick={() =>
                                        onSelectConversation(
                                            conversation
                                        )
                                    }

                                    sx={{
                                        borderRadius: 2,
                                        mb: 0.5,
                                        pr: 0.5,
                                        minHeight: 48,

                                        "&.Mui-selected": {
                                            bgcolor:
                                                "#EEF2FF"
                                        },

                                        "&.Mui-selected:hover": {
                                            bgcolor:
                                                "#E0E7FF"
                                        },

                                        "&:hover": {
                                            bgcolor:
                                                "#F3F4F6"
                                        }
                                    }}
                                >

                                    <ListItemText
                                        primary={
                                            <Typography
                                                component="span"
                                                sx={{
                                                    fontSize: 14,
                                                    fontWeight:
                                                        activeConversationId ===
                                                            conversation.id
                                                            ? 600
                                                            : 500,
                                                    color:
                                                        "#1F2937",
                                                    overflow:
                                                        "hidden",
                                                    textOverflow:
                                                        "ellipsis",
                                                    whiteSpace:
                                                        "nowrap",
                                                    pr: 1,
                                                    display:
                                                        "block"
                                                }}
                                            >
                                                {
                                                    conversation.title ||
                                                    "New Conversation"
                                                }
                                            </Typography>
                                        }
                                    />


                                    <Tooltip
                                        title={
                                            "Delete conversation"
                                        }
                                    >

                                        <IconButton
                                            size="small"
                                            onClick={(
                                                event
                                            ) =>
                                                handleDelete(
                                                    event,
                                                    conversation.id
                                                )
                                            }
                                            sx={{
                                                flexShrink: 0,
                                                color:
                                                    "#9CA3AF",

                                                "&:hover": {
                                                    color:
                                                        "#DC2626",
                                                    bgcolor:
                                                        "#FEE2E2"
                                                }
                                            }}
                                        >

                                            <DeleteOutlineRoundedIcon
                                                fontSize="small"
                                            />

                                        </IconButton>

                                    </Tooltip>

                                </ListItemButton>

                            )
                        )}

                    </List>

                )}

            </Box>

        </Box>
    );
}