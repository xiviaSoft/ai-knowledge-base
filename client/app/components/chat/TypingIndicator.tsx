"use client";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { Box, Typography } from "@mui/material";
export default function TypingIndicator() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2
            }}
        >
            <Box
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#EEF2FF",
                    color: "primary.main"
                }}
            >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Box
                sx={{
                    px: 1.8,
                    py: 1.2,
                    borderRadius: "16px 16px 16px 4px",
                    bgcolor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6
                }}
            >
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "text.secondary",
                        animation: "typing 1.2s infinite ease-in-out",
                        "@keyframes typing": {
                            "0%, 60%, 100%": {
                                opacity: 0.3,
                                transform: "translateY(0)"
                            },
                            "30%": {
                                opacity: 1,
                                transform: "translateY(-3px)"
                            }
                        }
                    }}
                />
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "text.secondary",
                        animation: "typing 1.2s infinite ease-in-out",
                        animationDelay: "0.2s",
                        "@keyframes typing": {
                            "0%, 60%, 100%": {
                                opacity: 0.3,
                                transform: "translateY(0)"
                            },
                            "30%": {
                                opacity: 1,
                                transform: "translateY(-3px)"
                            }
                        }
                    }}
                />
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "text.secondary",
                        animation: "typing 1.2s infinite ease-in-out",
                        animationDelay: "0.4s",
                        "@keyframes typing": {
                            "0%, 60%, 100%": {
                                opacity: 0.3,
                                transform: "translateY(0)"
                            },
                            "30%": {
                                opacity: 1,
                                transform: "translateY(-3px)"
                            }
                        }
                    }}
                />
                <Typography
                    variant="caption"
                    sx={{
                        ml: 0.5,
                        color: "text.secondary",
                        fontWeight: 600
                    }}
                >
                    Thinking...
                </Typography>
            </Box>
        </Box>
    );
}