"use client";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Box, Paper, Typography, Chip, Divider, IconButton } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
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
export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "USER";
    const sources = message.sources || [];
    const [copiedCode, setCopiedCode] = useState("");
    const copyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(""), 2000);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                mb: 1
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start"
                }}
            >
                <Box
                    sx={{
                        maxWidth: {
                            xs: "92%",
                            sm: "85%",
                            md: isUser ? "75%" : "85%"
                        },
                        minWidth: 0
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.8,
                            justifyContent: isUser ? "flex-end" : "flex-start"
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
                                <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
                            </Box>
                        )}
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                color: "text.secondary"
                            }}
                        >
                            {isUser ? "You" : "AI Assistant"}
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
                                <PersonOutlineRoundedIcon sx={{ fontSize: 18 }} />
                            </Box>
                        )}
                    </Box>
                    <Paper
                        elevation={0}
                        sx={{
                            px: 2.2,
                            py: 1.7,
                            borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                            bgcolor: isUser ? "primary.main" : "#FFFFFF",
                            color: isUser ? "#FFFFFF" : "text.primary",
                            border: isUser ? "none" : "1px solid #E5E7EB",
                            boxShadow: isUser ? "none" : "0 2px 8px rgba(15, 23, 42, 0.04)",
                            overflow: "hidden",
                            overflowWrap: "anywhere",
                            wordBreak: "break-word"
                        }}
                    >
                        {isUser ? (
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
                        ) : (
                            <Box
                                sx={{
                                    fontSize: 15,
                                    lineHeight: 1.75,
                                    overflowWrap: "anywhere",
                                    wordBreak: "break-word",
                                    "& p": {
                                        margin: "0 0 12px"
                                    },
                                    "& p:last-child": {
                                        marginBottom: 0
                                    },
                                    "& h1, & h2, & h3": {
                                        margin: "18px 0 10px",
                                        fontWeight: 700,
                                        lineHeight: 1.3
                                    },
                                    // "& h1:first-child, & h2:first-child, & h3:first-child": {
                                    //     marginTop: 0
                                    // },
                                    "& ul, & ol": {
                                        paddingLeft: "24px",
                                        margin: "8px 0 12px"
                                    },
                                    "& li": {
                                        marginBottom: "5px"
                                    },
                                    "& strong": {
                                        fontWeight: 700
                                    },
                                    "& blockquote": {
                                        margin: "12px 0",
                                        padding: "8px 16px",
                                        borderLeft: "4px solid",
                                        borderColor: "primary.main",
                                        bgcolor: "#F8FAFC"
                                    },
                                    "& table": {
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        margin: "12px 0"
                                    },
                                    "& th, & td": {
                                        border: "1px solid #E5E7EB",
                                        padding: "8px 10px",
                                        textAlign: "left"
                                    },
                                    "& th": {
                                        fontWeight: 700,
                                        bgcolor: "#F8FAFC"
                                    },
                                    "& code:not(pre code)": {
                                        px: 0.7,
                                        py: 0.2,
                                        borderRadius: 1,
                                        bgcolor: "#F1F5F9",
                                        fontSize: "0.9em",
                                        fontFamily: "monospace"
                                    },
                                    "& pre": {
                                        position: "relative",
                                        margin: "14px 0",
                                        padding: "16px",
                                        borderRadius: 2,
                                        overflowX: "auto",
                                        bgcolor: "#0F172A"
                                    },
                                    "& pre code": {
                                        display: "block",
                                        color: "#F8FAFC",
                                        background: "transparent",
                                        fontSize: 13,
                                        lineHeight: 1.6,
                                        fontFamily: "monospace"
                                    }
                                }}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                    components={{
                                        code({ className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            const code = String(children).replace(/\n$/, "");
                                            if (!match) {
                                                return (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }
                                            return (
                                                <Box
                                                    sx={{
                                                        position: "relative"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: 8,
                                                            right: 8,
                                                            zIndex: 1
                                                        }}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => copyCode(code)}
                                                            sx={{
                                                                color: "#CBD5E1",
                                                                bgcolor: "rgba(255,255,255,0.08)",
                                                                "&:hover": {
                                                                    bgcolor: "rgba(255,255,255,0.15)"
                                                                }
                                                            }}
                                                        >
                                                            {copiedCode === code ? (
                                                                <CheckRoundedIcon sx={{ fontSize: 17 }} />
                                                            ) : (
                                                                <ContentCopyRoundedIcon sx={{ fontSize: 17 }} />
                                                            )}
                                                        </IconButton>
                                                    </Box>
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                </Box>
                                            );
                                        }
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </Box>
                        )}
                        {!isUser && sources.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Divider sx={{ mb: 1.5 }} />
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
                                    {sources.map((source, index) => (
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
                                                    mb: source.text ? 0.5 : 0
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
                                                {typeof source.score === "number" && (
                                                    <Chip
                                                        size="small"
                                                        label={`${(source.score * 100).toFixed(0)}%`}
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
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}