"use client";

import { Paper, Typography, Box } from "@mui/material";

export default function MessageBubble({ message }: any) {

    const isUser = message.role === "USER";

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                mb: 2
            }}
        >

            <Paper
                sx={{
                    p: 2,
                    maxWidth: "75%",
                    borderRadius: 3,
                    bgcolor: isUser ? "primary.main" : "grey.100",
                    color: isUser ? "#fff" : "text.primary"
                }}
            >

                <Typography
                    sx={{
                        whiteSpace: "pre-wrap"
                    }}
                >

                    {message.content}

                </Typography>

            </Paper>

        </Box>

    );

}