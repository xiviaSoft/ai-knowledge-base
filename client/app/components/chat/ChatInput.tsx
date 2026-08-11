"use client";

import { KeyboardEvent, useState } from "react";

import {
    Box,
    TextField,
    IconButton,
    Paper,
    CircularProgress,
    Typography
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({
    onSend,
    disabled = false
}: ChatInputProps) {

    const [message, setMessage] = useState("");

    const canSend =
        message.trim().length > 0 &&
        !disabled;


    const handleSend = () => {

        const trimmedMessage =
            message.trim();

        if (!trimmedMessage || disabled) {
            return;
        }

        onSend(trimmedMessage);

        setMessage("");
    };


    const handleKeyDown = (
        event: KeyboardEvent<
            HTMLDivElement
        >
    ) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            handleSend();
        }
    };


    return (
        <Paper
            square
            elevation={0}
            sx={{
                flexShrink: 0,
                borderTop: "1px solid #E5E7EB",
                bgcolor: "#FFFFFF",
                px: {
                    xs: 1.5,
                    sm: 2.5,
                    md: 4
                },
                py: 2
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    mx: "auto"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 1.5,
                        p: 0.75,
                        pl: 1.5,
                        border: "1px solid #D1D5DB",
                        borderRadius: 3,
                        bgcolor: "#FFFFFF",

                        transition: "border-color .2s, box-shadow .2s",

                        "&:focus-within": {
                            borderColor: "primary.main",
                            boxShadow:
                                "0 0 0 3px rgba(25,118,210,0.08)"
                        }
                    }}
                >

                    <TextField
                        fullWidth
                        multiline
                        maxRows={6}
                        disabled={disabled}
                        placeholder={
                            disabled
                                ? "AI is thinking..."
                                : "Ask anything about your documents..."
                        }
                        value={message}
                        onChange={(event) =>
                            setMessage(
                                event.target.value
                            )
                        }
                        onKeyDown={handleKeyDown}
                        variant="standard"
                        slotProps={{
                            input: {
                                disableUnderline: true
                            }
                        }}
                        sx={{
                            "& .MuiInputBase-root": {
                                px: 0.5,
                                py: 0.75,
                                fontSize: 15,
                                lineHeight: 1.6
                            }
                        }}
                    />

                    <IconButton
                        color="primary"
                        disabled={!canSend}
                        onClick={handleSend}
                        aria-label="Send message"
                        sx={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            borderRadius: 2.5,
                            bgcolor: canSend
                                ? "primary.main"
                                : "#E5E7EB",
                            color: canSend
                                ? "#FFFFFF"
                                : "#9CA3AF",

                            "&:hover": {
                                bgcolor: canSend
                                    ? "primary.dark"
                                    : "#E5E7EB"
                            },

                            "&.Mui-disabled": {
                                bgcolor: "#E5E7EB",
                                color: "#9CA3AF"
                            }
                        }}
                    >

                        {disabled ? (
                            <CircularProgress
                                size={20}
                                color="inherit"
                            />
                        ) : (
                            <SendRoundedIcon
                                sx={{
                                    fontSize: 21
                                }}
                            />
                        )}

                    </IconButton>

                </Box>

                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        mt: 0.8,
                        textAlign: "center",
                        color: "text.secondary",
                        fontSize: 11.5
                    }}
                >
                    Press Enter to send · Shift + Enter for a new line
                </Typography>

            </Box>

        </Paper>
    );
}