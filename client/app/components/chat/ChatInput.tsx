"use client";

import { useState } from "react";

import {

    Box,
    TextField,
    IconButton,
    Paper

} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function ChatInput({

    onSend

}: any) {

    const [message, setMessage] = useState("");

    function handleSend() {

        if (!message.trim()) return;

        onSend(message);

        setMessage("");

    }

    return (

        <Paper
            square
            sx={{
                p: 2,
                borderTop: "1px solid #eee"
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    gap: 2
                }}
            >

                <TextField

                    fullWidth

                    placeholder="Ask anything..."

                    value={message}

                    onChange={(e) =>

                        setMessage(e.target.value)

                    }

                    onKeyDown={(e) => {

                        if (e.key === "Enter" && !e.shiftKey) {

                            e.preventDefault();

                            handleSend();

                        }

                    }}

                />

                <IconButton

                    color="primary"

                    onClick={handleSend}

                >

                    <SendRoundedIcon />

                </IconButton>

            </Box>

        </Paper>

    );

}