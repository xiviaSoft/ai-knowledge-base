"use client";

import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";

interface ChatMessage {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    sources?: any[];
}

interface MessageListProps {
    messages: ChatMessage[];
}

export default function MessageList({
    messages
}: MessageListProps) {

    if (!messages?.length) {
        return null;
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1000,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                pb: 3,

                /*
                 * Prevent long AI responses,
                 * URLs or source text from
                 * creating horizontal overflow.
                 */
                overflowX: "hidden",

                "& *": {
                    maxWidth: "100%"
                }
            }}
        >
            {messages.map((message) => (
                <Box
                    key={message.id}
                    sx={{
                        width: "100%",
                        minWidth: 0,

                        /*
                         * Allow long words,
                         * URLs and generated text
                         * to wrap correctly.
                         */
                        overflowWrap: "anywhere",
                        wordBreak: "break-word"
                    }}
                >
                    <MessageBubble
                        message={message}
                    />
                </Box>
            ))}
        </Box>
    );
}