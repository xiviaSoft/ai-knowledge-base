"use client";

import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    InputBase,
    Paper,
    Drawer,
    Badge,
    Popover,
    Divider,
    CircularProgress,
    Button
} from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SearchDropdown from "@/app/components/search/SearchDropdown";
import useWorkspaceSearch from "@/app/hooks/useWorkspaceSearch";
import useNotifications from "@/app/hooks/useNotifications";
import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface WorkspaceNavbarProps {
    workspaceId: string;
}

export default function WorkspaceNavbar({
    workspaceId
}: WorkspaceNavbarProps) {
    const { user, logout } = useAuth();
    const router = useRouter();


    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);

    const [notificationAnchorEl, setNotificationAnchorEl] =
        useState<null | HTMLElement>(null);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] =
        useState(false);

    const {
        results,
        loading: searchLoading,
        error: searchError
    } = useWorkspaceSearch(
        workspaceId,
        searchKeyword
    );

    const {
        notifications,
        unreadCount,
        loading: notificationLoading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        acceptInvitation,
        rejectInvitation
    } = useNotifications();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSearchOpen(false);
                setMobileSearchOpen(false);
                setNotificationAnchorEl(null);
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, []);

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setSearchKeyword(value);
        setSearchOpen(Boolean(value.trim()));
    };

    const clearSearch = () => {
        setSearchKeyword("");
        setSearchOpen(false);
        setMobileSearchOpen(false);
    };

    const handleDocumentClick = (
        documentId: string
    ) => {
        clearSearch();

        router.push(
            `/workspace/${workspaceId}/documents/${documentId}`
        );
    };

    const handleConversationClick = (
        conversationId: string
    ) => {
        clearSearch();

        router.push(
            `/workspace/${workspaceId}/chat`
        );
    };

    const handleMemberClick = (
        memberId: string
    ) => {
        clearSearch();

        router.push(
            `/workspace/${workspaceId}/members/${memberId}`
        );
    };

    const handleNotificationClick = async (
        notificationId: string,
        isRead: boolean
    ) => {
        if (!isRead) {
            await markAsRead(notificationId);
        }
    };

    const handleAcceptInvitation = async (
        invitationId: string
    ) => {
        try {
            await acceptInvitation(invitationId);
        } catch (error) {
            console.error(
                "Failed to accept invitation:",
                error
            );
        }
    };

    const handleRejectInvitation = async (
        invitationId: string
    ) => {
        try {
            await rejectInvitation(invitationId);
        } catch (error) {
            console.error(
                "Failed to reject invitation:",
                error
            );
        }
    };
    const searchBox = (
        <Box
            data-search-container
            sx={{
                position: "relative",
                width: "100%"
            }}
        >
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    px: {
                        xs: 1.5,
                        sm: 2
                    },
                    py: 0.7,
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "1px solid",
                    borderColor: searchOpen
                        ? "primary.main"
                        : "divider"
                }}
            >
                <SearchRoundedIcon
                    color="action"
                    sx={{
                        fontSize: {
                            xs: 20,
                            sm: 22
                        }
                    }}
                />

                <InputBase
                    autoFocus={mobileSearchOpen}
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    onFocus={() => {
                        if (searchKeyword.trim()) {
                            setSearchOpen(true);
                        }
                    }}
                    placeholder="Search documents, members..."
                    sx={{
                        ml: 1,
                        flex: 1,
                        minWidth: 0,
                        fontSize: {
                            xs: 14,
                            sm: 15
                        }
                    }}
                />

                {searchKeyword && (
                    <IconButton
                        size="small"
                        onClick={clearSearch}
                        sx={{
                            ml: 0.5
                        }}
                    >
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                )}
            </Paper>

            {searchOpen && (
                <SearchDropdown
                    results={results}
                    loading={searchLoading}
                    error={searchError}
                    keyword={searchKeyword}
                    onDocumentClick={handleDocumentClick}
                    onConversationClick={
                        handleConversationClick
                    }
                    onMemberClick={handleMemberClick}
                />
            )}
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                color="inherit"
                sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(255,255,255,.9)",
                    backdropFilter: "blur(12px)",
                    zIndex: 1201
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: {
                            xs: 64,
                            sm: 72
                        },
                        height: {
                            xs: 64,
                            sm: 72
                        },
                        px: {
                            xs: 1.5,
                            sm: 2,
                            md: 3
                        },
                        gap: {
                            xs: 1,
                            sm: 2
                        }
                    }}
                >
                    <IconButton
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none"
                            }
                        }}
                        onClick={() => {
                            window.dispatchEvent(
                                new CustomEvent(
                                    "workspace-sidebar-toggle"
                                )
                            );
                        }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 17,
                                sm: 19,
                                md: 20
                            },
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            display: {
                                xs: "none",
                                sm: "block"
                            }
                        }}
                    >
                        AI Knowledge Base
                    </Typography>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block"
                            },
                            flex: 1,
                            maxWidth: 420,
                            mx: "auto"
                        }}
                    >
                        {searchBox}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: {
                                xs: 0,
                                sm: 1
                            },
                            ml: {
                                xs: "auto",
                                sm: 0
                            }
                        }}
                    >
                        <IconButton
                            sx={{
                                display: {
                                    xs: "flex",
                                    sm: "none"
                                }
                            }}
                            onClick={() => {
                                setMobileSearchOpen(true);
                            }}
                        >
                            <SearchRoundedIcon />
                        </IconButton>

                        <IconButton
                            onClick={(event) => {
                                setNotificationAnchorEl(
                                    event.currentTarget
                                );
                            }}
                            aria-label="notifications"
                        >
                            <Badge
                                badgeContent={unreadCount}
                                color="error"
                                max={99}
                            >
                                <NotificationsNoneRoundedIcon />
                            </Badge>
                        </IconButton>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                p: 0.5,
                                borderRadius: 2,
                                "&:hover": {
                                    bgcolor: "action.hover"
                                }
                            }}
                            onClick={(e) =>
                                setAnchorEl(
                                    e.currentTarget
                                )
                            }
                        >
                            <Avatar
                                src={undefined}
                                sx={{
                                    width: {
                                        xs: 34,
                                        sm: 38
                                    },
                                    height: {
                                        xs: 34,
                                        sm: 38
                                    }
                                }}
                            >
                                {user?.first_name?.charAt(0) ||
                                    "U"}
                            </Avatar>

                            <Box
                                sx={{
                                    ml: 1,
                                    display: {
                                        xs: "none",
                                        sm: "block"
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 14
                                    }}
                                >
                                    {user?.first_name ||
                                        "User"}
                                </Typography>
                            </Box>

                            <KeyboardArrowDownRoundedIcon
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "block"
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="top"
                open={mobileSearchOpen}
                onClose={() => {
                    setMobileSearchOpen(false);
                    setSearchOpen(false);
                }}
                sx={{
                    p: 1.5,
                    pt: 2,
                    bgcolor: "#fff"
                }}
            >
                {searchBox}
            </Drawer>

            <Popover
                open={Boolean(
                    notificationAnchorEl
                )}
                anchorEl={notificationAnchorEl}
                onClose={() =>
                    setNotificationAnchorEl(null)
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                slotProps={{
                    paper: {
                        sx: {
                            width: {
                                xs: "calc(100vw - 24px)",
                                sm: 380
                            },
                            maxWidth: 380,
                            mt: 1,
                            borderRadius: 3,
                            overflow: "hidden"
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        sx={{ fontSize: 16, fontWeight: 700 }}
                    >
                        Notifications
                    </Typography>

                    {unreadCount > 0 && (
                        <Typography
                            component="button"
                            onClick={markAllAsRead}
                            sx={{
                                border: 0,
                                bgcolor: "transparent",
                                color: "primary.main",
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 600,
                                p: 0
                            }}
                        >
                            Mark all as read
                        </Typography>
                    )}
                </Box>

                <Divider />

                {notificationLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 5
                        }}
                    >
                        <CircularProgress size={28} />
                    </Box>
                ) : notifications.length === 0 ? (
                    <Box
                        sx={{
                            px: 2,
                            py: 5,
                            textAlign: "center"
                        }}
                    >
                        <NotificationsNoneRoundedIcon
                            sx={{
                                fontSize: 42,
                                color: "text.disabled",
                                mb: 1
                            }}
                        />

                        <Typography
                            sx={{ fontWeight: 600 }}
                            color="text.secondary"
                        >
                            No notifications
                        </Typography>

                        <Typography
                            color="text.disabled"
                            sx={{ mt: 0.5, fontSize: 13 }}
                        >
                            You're all caught up.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            maxHeight: 430,
                            overflowY: "auto"
                        }}
                    >
                        {notifications.map(
                            (notification) => (
                                <Box
                                    key={notification.id}
                                    onClick={() =>
                                        handleNotificationClick(
                                            notification.id,
                                            notification.is_read
                                        )
                                    }
                                    sx={{
                                        px: 2,
                                        py: 1.5,
                                        display: "flex",
                                        gap: 1.5,
                                        cursor: "pointer",
                                        bgcolor:
                                            notification.is_read
                                                ? "transparent"
                                                : "action.hover",
                                        "&:hover": {
                                            bgcolor: "action.hover"
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            bgcolor:
                                                notification.is_read
                                                    ? "transparent"
                                                    : "primary.main",
                                            flexShrink: 0,
                                            mt: 1
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            flex: 1,
                                            minWidth: 0
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                fontWeight:
                                                    notification.is_read
                                                        ? 500
                                                        : 700
                                            }}
                                        >
                                            {notification.title}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                mt: 0.3,
                                                lineHeight: 1.4,
                                                fontSize: 13
                                            }}
                                        >
                                            {notification.message}
                                        </Typography>

                                        <Typography
                                            color="text.disabled"
                                            sx={{
                                                mt: 0.7,
                                                fontSize: 11
                                            }}
                                        >
                                            {notification.created_at
                                                ? new Date(
                                                    notification.created_at
                                                ).toLocaleString()
                                                : ""}
                                        </Typography>

                                        {notification.type ===
                                            "WORKSPACE_INVITATION" &&
                                            notification.invitation_id &&
                                            !notification.is_read && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1,
                                                        mt: 1.2
                                                    }}
                                                >
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        onClick={(event) => {
                                                            event.stopPropagation();

                                                            handleAcceptInvitation(
                                                                notification.invitation_id!
                                                            );
                                                        }}
                                                        sx={{
                                                            minWidth: 0,
                                                            px: 1.5,
                                                            textTransform:
                                                                "none",
                                                            fontSize: 12
                                                        }}
                                                    >
                                                        Accept
                                                    </Button>

                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                            event.stopPropagation();

                                                            handleRejectInvitation(
                                                                notification.invitation_id!
                                                            );
                                                        }}
                                                        sx={{
                                                            minWidth: 0,
                                                            px: 1.5,
                                                            textTransform:
                                                                "none",
                                                            fontSize: 12
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </Box>
                                            )}
                                    </Box>

                                    <IconButton
                                        size="small"
                                        onClick={async (event) => {
                                            event.stopPropagation();

                                            await deleteNotification(
                                                notification.id
                                            );
                                        }}
                                        sx={{
                                            alignSelf: "flex-start"
                                        }}
                                    >
                                        <DeleteOutlineRoundedIcon
                                            fontSize="small"
                                        />
                                    </IconButton>

                                    {notification.is_read && (
                                        <CheckRoundedIcon
                                            sx={{
                                                fontSize: 16,
                                                color: "success.main",
                                                mt: 0.5
                                            }}
                                        />
                                    )}
                                </Box>
                            )
                        )}
                    </Box>
                )}
            </Popover>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        logout();
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </>
    );


}
