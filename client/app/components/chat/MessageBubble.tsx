"use client";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { Box, Paper, Typography, Chip, Divider } from "@mui/material";

interface MessageSource {
    documentId?: string | null;
    chunkIndex?: number | null;
    score?: number;
    text?: string;
}

interface ChatMessage {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    sources?: MessageSource[];
}

interface MessageBubbleProps {
    message: ChatMessage;
}

export default function MessageBubble({
    message
}: MessageBubbleProps) {

    const isUser = message.role === "USER";

    const sources = message.sources || [];

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: isUser
                    ? "flex-end"
                    : "flex-start",
                mb: 1
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: isUser
                        ? "flex-end"
                        : "flex-start"
                }}
            >

                <Box
                    sx={{
                        maxWidth: {
                            xs: "92%",
                            sm: "85%",
                            md: isUser
                                ? "75%"
                                : "85%"
                        },
                        minWidth: 0
                    }}
                >

                    {/* =========================
                        Message Header
                    ========================== */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.8,
                            justifyContent: isUser
                                ? "flex-end"
                                : "flex-start"
                        }}
                    >

                        {!isUser && (
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "#EEF2FF",
                                    color: "primary.main"
                                }}
                            >
                                <AutoAwesomeRoundedIcon
                                    sx={{
                                        fontSize: 18
                                    }}
                                />
                            </Box>
                        )}

                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                color: "text.secondary"
                            }}
                        >
                            {isUser
                                ? "You"
                                : "AI Assistant"}
                        </Typography>

                        {isUser && (
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "primary.main",
                                    color: "#fff"
                                }}
                            >
                                <PersonOutlineRoundedIcon
                                    sx={{
                                        fontSize: 18
                                    }}
                                />
                            </Box>
                        )}

                    </Box>


                    {/* =========================
                        Message
                    ========================== */}

                    <Paper
                        elevation={0}
                        sx={{
                            px: 2.2,
                            py: 1.7,

                            borderRadius: isUser
                                ? "18px 18px 4px 18px"
                                : "18px 18px 18px 4px",

                            bgcolor: isUser
                                ? "primary.main"
                                : "#FFFFFF",

                            color: isUser
                                ? "#FFFFFF"
                                : "text.primary",

                            border: isUser
                                ? "none"
                                : "1px solid #E5E7EB",

                            boxShadow: isUser
                                ? "none"
                                : "0 2px 8px rgba(15, 23, 42, 0.04)",

                            overflow: "hidden",

                            overflowWrap: "anywhere",
                            wordBreak: "break-word"
                        }}
                    >

                        <Typography
                            component="div"
                            sx={{
                                fontSize: 15,
                                lineHeight: 1.75,
                                whiteSpace: "pre-wrap",
                                overflowWrap: "anywhere",
                                wordBreak: "break-word"
                            }}
                        >
                            {message.content}
                        </Typography>


                        {/* =========================
                            Sources
                        ========================== */}

                        {!isUser &&
                            sources.length > 0 && (

                                <Box
                                    sx={{
                                        mt: 2
                                    }}
                                >

                                    <Divider
                                        sx={{
                                            mb: 1.5
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.8,
                                            mb: 1
                                        }}
                                    >

                                        <DescriptionOutlinedIcon
                                            sx={{
                                                fontSize: 18,
                                                color: "text.secondary"
                                            }}
                                        />

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                color: "text.secondary"
                                            }}
                                        >
                                            Sources
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 0.8
                                        }}
                                    >

                                        {sources.map(
                                            (
                                                source,
                                                index
                                            ) => (

                                                <Box
                                                    key={`${source.documentId || "source"}-${index}`}
                                                    sx={{
                                                        p: 1.2,
                                                        borderRadius: 1.5,
                                                        bgcolor: "#F8FAFC",
                                                        border: "1px solid #E5E7EB"
                                                    }}
                                                >

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            gap: 1,
                                                            mb: source.text
                                                                ? 0.5
                                                                : 0
                                                        }}
                                                    >

                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap"
                                                            }}
                                                        >
                                                            Source {index + 1}
                                                        </Typography>

                                                        {typeof source.score ===
                                                            "number" && (

                                                                <Chip
                                                                    size="small"
                                                                    label={`${(
                                                                        source.score *
                                                                        100
                                                                    ).toFixed(0)}%`}
                                                                    sx={{
                                                                        height: 22,
                                                                        fontSize: 11
                                                                    }}
                                                                />

                                                            )}

                                                    </Box>


                                                    {source.text && (

                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 3,
                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                                color: "text.secondary",
                                                                lineHeight: 1.5
                                                            }}
                                                        >
                                                            {source.text}
                                                        </Typography>

                                                    )}

                                                </Box>

                                            )
                                        )}

                                    </Box>

                                </Box>

                            )}

                    </Paper>

                </Box>

            </Box>

        </Box>
    );
}