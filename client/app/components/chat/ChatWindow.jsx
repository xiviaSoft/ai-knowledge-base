"use client";
import {
    Box,
    Typography,
} from "@mui/material";
import ChatMessage from "./ChatMessage";
import AnswerCard from "../cards/AnswerCard";
import TypingIndicator from "./TypingIndicator";
import { useEffect, useRef } from "react";
export default function ChatWindow({
    messages,
    loading,
}) {
    const bottomRef = useRef(null);
    useEffect(() => {
    bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });
}, [messages, loading]);
    if (messages.length === 0) {
        return (
            <Box
                sx={{
                    flex: 1,
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Box textalign="center">

                    <Typography
                        variant="h3"
                        fontWeight={700}
                    >
                        🤖 AI Knowledge Assistant
                    </Typography>

                    <Typography
                        sx={{ mt: 2 }}
                        color="text.secondary"
                    >
                        Search Wikipedia or your documents.
                    </Typography>

                </Box>
            </Box>
        );
    }
    return (
        <Box
            sx={{
                flex: 1,
                overflowY: "auto",
                p: 4,
            }}
        >

            {messages.map((msg, index) => {
                if (msg.role === "user") {
                    return (
                        <ChatMessage
                            key={index}
                            role="user"
                            message={msg.message}
                        />
                    );
                }
                return (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            mb: 3,
                        }}
                    >
                        <AnswerCard
                            title={msg.data.title}
                            description={msg.data.description}
                            image={msg.data.image}
                            answer={msg.data.answer}
                            source={msg.data.source}
                            processingTime={msg.data.processingTime}
                        />
                    </Box>
                );
            })}
            {loading && <TypingIndicator />}
            <div ref={bottomRef}></div>
        </Box>
    );
}