"use client";

import {
    Avatar,
    Box,
    ButtonBase,
    CircularProgress,
    Typography
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import {
    SearchResults
} from "@/app/services/search.service";

interface SearchDropdownProps {
    results: SearchResults;
    loading: boolean;
    error: string;
    keyword: string;
    onDocumentClick?: (documentId: string) => void;
    onConversationClick?: (conversationId: string) => void;
    onMemberClick?: (memberId: string) => void;
}

export default function SearchDropdown({
    results,
    loading,
    error,
    keyword,
    onDocumentClick,
    onConversationClick,
    onMemberClick
}: SearchDropdownProps) {
    const hasResults =
        results.documents.length > 0 ||
        results.conversations.length > 0 ||
        results.members.length > 0;

    if (!keyword.trim()) {
        return null;
    }

    return (
        <Box
            sx={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                zIndex: 1300,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2.5,
                bgcolor: "background.paper",
                boxShadow: "0 12px 40px rgba(15, 23, 42, 0.12)"
            }}
        >
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 2,
                        py: 1.75
                    }}
                >
                    <CircularProgress size={18} />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Searching...
                    </Typography>
                </Box>
            )}

            {!loading && error && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        px: 2,
                        py: 4,
                        textAlign: "center"
                    }}
                >
                    <SearchOffRoundedIcon
                        sx={{
                            mb: 1,
                            fontSize: 28,
                            color: "error.light"
                        }}
                    />

                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                        color="error"
                    >
                        Search failed
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        {error}
                    </Typography>
                </Box>
            )}

            {!loading && !error && !hasResults && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        px: 2,
                        py: 4,
                        textAlign: "center"
                    }}
                >
                    <SearchRoundedIcon
                        sx={{
                            mb: 1,
                            fontSize: 28,
                            color: "text.disabled"
                        }}
                    />

                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                    >
                        No results found
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Try another document, conversation, or member name.
                    </Typography>
                </Box>
            )}

            {!loading && !error && hasResults && (
                <Box
                    sx={{
                        maxHeight: 440,
                        overflowY: "auto"
                    }}
                >
                    {results.documents.length > 0 && (
                        <SearchSection title="Documents">
                            {results.documents.map((document) => (
                                <SearchItem
                                    key={document.id}
                                    icon={
                                        <DescriptionOutlinedIcon
                                            fontSize="small"
                                        />
                                    }
                                    title={document.original_name}
                                    subtitle={
                                        document.file_type ||
                                        "Document"
                                    }
                                    onClick={() =>
                                        onDocumentClick?.(
                                            document.id
                                        )
                                    }
                                />
                            ))}
                        </SearchSection>
                    )}

                    {results.conversations.length > 0 && (
                        <SearchSection title="Conversations">
                            {results.conversations.map(
                                (conversation) => (
                                    <SearchItem
                                        key={conversation.id}
                                        icon={
                                            <ChatBubbleOutlineRoundedIcon
                                                fontSize="small"
                                            />
                                        }
                                        title={
                                            conversation.title ||
                                            "Untitled conversation"
                                        }
                                        subtitle="Conversation"
                                        onClick={() =>
                                            onConversationClick?.(
                                                conversation.id
                                            )
                                        }
                                    />
                                )
                            )}
                        </SearchSection>
                    )}

                    {results.members.length > 0 && (
                        <SearchSection title="Members">
                            {results.members.map((member) => {
                                const user = member.users;

                                const fullName =
                                    `${user.first_name} ${user.last_name || ""
                                        }`.trim();

                                return (
                                    <SearchItem
                                        key={member.id}
                                        icon={
                                            user.avatar ? (
                                                <Avatar
                                                    src={user.avatar}
                                                    alt={fullName}
                                                    sx={{
                                                        width: 32,
                                                        height: 32
                                                    }}
                                                />
                                            ) : (
                                                <Avatar
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        bgcolor:
                                                            "action.hover",
                                                        color:
                                                            "text.secondary"
                                                    }}
                                                >
                                                    <PersonOutlineRoundedIcon
                                                        fontSize="small"
                                                    />
                                                </Avatar>
                                            )
                                        }
                                        title={
                                            fullName ||
                                            user.email
                                        }
                                        subtitle={
                                            fullName
                                                ? user.email
                                                : member.role
                                        }
                                        onClick={() =>
                                            onMemberClick?.(
                                                member.id
                                            )
                                        }
                                    />
                                );
                            })}
                        </SearchSection>
                    )}
                </Box>
            )}
        </Box>
    );
}

function SearchSection({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": {
                    borderBottom: "none"
                }
            }}
        >
            <Typography
                sx={{
                    px: 2,
                    pt: 1.5,
                    pb: 0.75,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "text.secondary"
                }}
            >
                {title}
            </Typography>

            <Box sx={{ pb: 0.75 }}>
                {children}
            </Box>
        </Box>
    );
}

function SearchItem({
    icon,
    title,
    subtitle,
    onClick
}: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onClick?: () => void;
}) {
    return (
        <ButtonBase
            onClick={onClick}
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1.5,
                px: 2,
                py: 1.25,
                textAlign: "left",
                borderRadius: 0,
                "&:hover": {
                    bgcolor: "action.hover"
                }
            }}
        >
            <Box
                sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary"
                }}
            >
                {icon}
            </Box>

            <Box
                sx={{
                    minWidth: 0,
                    flex: 1
                }}
            >
                <Typography
                    variant="body2"
                    noWrap
                    sx={{ fontWeight: 500 }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        sx={{ display: 'block' }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </ButtonBase>
    );
}