"use client";
import { AppBar, Toolbar, Box, Typography, IconButton, Avatar, Menu, MenuItem, InputBase, Paper } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchDropdown from "@/app/components/search/SearchDropdown";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useWorkspaceSearch from "@/app/hooks/useWorkspaceSearch";
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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const router = useRouter();
    const {
        results,
        loading,
        error
    } = useWorkspaceSearch(
        workspaceId,
        searchKeyword
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSearchOpen(false);
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

    const handleDocumentClick = (documentId: string) => {
        setSearchOpen(false);
        setSearchKeyword("");

        router.push(
            `/workspace/${workspaceId}/documents/${documentId}`
        );
    };

    const handleConversationClick = (
        conversationId: string
    ) => {
        setSearchOpen(false);
        setSearchKeyword("");

        router.push(
            `/workspace/${workspaceId}/chat/${conversationId}`
        );
    };

    const handleMemberClick = (memberId: string) => {
        setSearchOpen(false);
        setSearchKeyword("");

        router.push(
            `/workspace/${workspaceId}/members/${memberId}`
        );
    };

    return (
        <AppBar
            position="fixed"
            color="inherit"
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(255,255,255,.85)",
                backdropFilter: "blur(12px)",
                zIndex: 1201
            }}
        >
            <Toolbar
                sx={{
                    height: 72,
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 700
                    }}
                >
                    AI Knowledge Base
                </Typography>

                <Box
                    data-search-container
                    sx={{
                        position: "relative",
                        width: 350
                    }}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            px: 2,
                            py: 0.8,
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
                        />

                        <InputBase
                            value={searchKeyword}
                            onChange={
                                handleSearchChange
                            }
                            onFocus={() => {
                                if (
                                    searchKeyword.trim()
                                ) {
                                    setSearchOpen(true);
                                }
                            }}
                            placeholder="Search..."
                            sx={{
                                ml: 1,
                                flex: 1
                            }}
                        />
                        {searchKeyword && (
                            <IconButton
                                size="small"
                                onClick={() => {
                                    setSearchKeyword("");
                                    setSearchOpen(false);
                                }}
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
                            loading={loading}
                            error={error}
                            keyword={searchKeyword}
                            onDocumentClick={
                                handleDocumentClick
                            }
                            onConversationClick={
                                handleConversationClick
                            }
                            onMemberClick={
                                handleMemberClick
                            }
                        />
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <IconButton>
                        <NotificationsNoneRoundedIcon />
                    </IconButton>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                        onClick={(e) =>
                            setAnchorEl(e.currentTarget)
                        }
                    >
                        <Avatar>
                            {user?.first_name?.charAt(0) ||
                                "U"}
                        </Avatar>

                        <Box sx={{ ml: 1 }}>
                            <Typography
                                sx={{
                                    fontWeight: 600
                                }}
                            >
                                {user?.first_name ||
                                    "User"}
                            </Typography>
                        </Box>

                        <KeyboardArrowDownRoundedIcon />
                    </Box>
                </Box>
            </Toolbar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem>
                    Profile
                </MenuItem>

                <MenuItem>
                    Settings
                </MenuItem>

                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
            </Menu>
        </AppBar>
    );
}