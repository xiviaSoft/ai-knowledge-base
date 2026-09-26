"use client";
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Typography, useMediaQuery } from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useParams, usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";

const drawerWidth = 280;
const collapsedWidth = 80;
export default function WorkspaceSidebar() {
    const pathname = usePathname();
    const params = useParams();
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width:899px)");
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const workspaceId = Array.isArray(params.workspaceId)
        ? params.workspaceId[0]
        : params.workspaceId;
    const menu = [
        {
            title: "Dashboard",
            icon: <DashboardRoundedIcon />,
            href: `/workspace/${workspaceId}`
        },
        {
            title: "Documents",
            icon: <DescriptionRoundedIcon />,
            href: `/workspace/${workspaceId}/documents`
        },
        {
            title: "Chat",
            icon: <ChatRoundedIcon />,
            href: `/workspace/${workspaceId}/chat`
        },
        {
            title: "Members",
            icon: <GroupsRoundedIcon />,
            href: `/workspace/${workspaceId}/members`
        },
        {
            title: "Settings",
            icon: <SettingsRoundedIcon />,
            href: `/workspace/${workspaceId}/settings`
        }
    ];
    
    const isActive = (href: string) => {
        if (!pathname) {
            return false;
        }
        if (href === `/workspace/${workspaceId}`) {
            return pathname === href;
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };
    const userName = user?.first_name || "User";
    const handleNavigation = () => {
        if (isMobile) {
            setMobileOpen(false);
        }
    };
    const sidebarContent = (
        <Box
            sx={{
                height: "100%",
                width: isMobile
                    ? drawerWidth
                    : collapsed
                        ? collapsedWidth
                        : drawerWidth,
                bgcolor: "#1A202C",
                color: "#fff",
                p: collapsed && !isMobile ? 1.5 : 2,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxSizing: "border-box",
                mt: collapsed ? 8 : 0
            }}
        >
            <Box sx={{ mb: 3 }}>
                {(!collapsed || isMobile) && (
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
                                flexShrink: 0,
                                borderRadius: 1,
                                background:
                                    "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: 14
                            }}
                        >
                            +
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontSize: "1rem",
                                whiteSpace: "nowrap"
                            }}
                        >
                            AI Knowledge Base
                        </Typography>
                    </Box>
                )}
            </Box>

            {(!collapsed || isMobile) && (
                <Box sx={{ mb: 1.5 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            color: "#718096",
                            textTransform: "uppercase",
                            fontSize: "0.7rem",
                            letterSpacing: 0.5,
                            display: "block"
                        }}
                    >
                        Main Menu
                    </Typography>
                </Box>
            )}
            <List
                sx={{
                    flex: 1,
                    pb: 0,
                    overflowY: "auto",
                    overflowX: "hidden",
                    "&::-webkit-scrollbar": {
                        width: 5
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#374151",
                        borderRadius: 10
                    }
                }}
            >
                {menu.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <ListItemButton
                            key={item.href}
                            component={Link}
                            href={item.href}
                            selected={active}
                            onClick={handleNavigation}
                            title={
                                collapsed && !isMobile
                                    ? item.title
                                    : undefined
                            }
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                minHeight: 48,
                                transition: "0.2s",
                                justifyContent:
                                    collapsed && !isMobile
                                        ? "center"
                                        : "flex-start",
                                px:
                                    collapsed && !isMobile
                                        ? 1
                                        : 2,
                                py: 1.2,
                                color: active
                                    ? "#667EEA"
                                    : "#CBD5E0",
                                bgcolor: active
                                    ? "rgba(102, 126, 234, 0.1)"
                                    : "transparent",
                                "&:hover": {
                                    bgcolor: active
                                        ? "rgba(102, 126, 234, 0.1)"
                                        : "#2D3748"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth:
                                        collapsed && !isMobile
                                            ? "auto"
                                            : 24,
                                    flexShrink: 0
                                }}
                            >
                                {item.icon}
                            </Box>
                            {(!collapsed || isMobile) && (
                                <ListItemText
                                    primary={item.title}
                                    sx={{
                                        ml: 2,
                                        "& .MuiListItemText-primary": {
                                            fontWeight: 500,
                                            whiteSpace: "nowrap"
                                        }
                                    }}
                                />
                            )}
                        </ListItemButton>
                    );
                })}
            </List>
            <Divider
                sx={{
                    bgcolor: "#2D3748",
                    my: 2
                }}
            />
            {(!collapsed || isMobile) && (
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 600,
                            color: "#718096",
                            textTransform: "uppercase",
                            fontSize: "0.7rem",
                            letterSpacing: 0.5,
                            mb: 2,
                            display: "block"
                        }}
                    >
                        Account
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "#2D3748",
                            minWidth: 0,
                            "&:hover": {
                                bgcolor: "#3D4758"
                            }
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 38,
                                height: 38,
                                flexShrink: 0
                            }}
                        >
                            {user?.first_name?.charAt(0) || "U"}
                        </Avatar>
                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    color: "#E2E8F0",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {userName}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#A0AEC0",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    display: "block"
                                }}
                            >
                                {user?.email || "Account"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
            {!isMobile && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: collapsed
                            ? "center"
                            : "flex-start"
                    }}
                >
                    <IconButton
                        onClick={() =>
                            setCollapsed((value) => !value)
                        }
                        sx={{
                            color: "#A0AEC0",
                            borderRadius: 1,
                            border: "1px solid #2D3748",
                            p: 1,
                            transition: "0.2s",
                            "&:hover": {
                                color: "#CBD5E0",
                                bgcolor: "#2D3748"
                            }
                        }}
                        title={
                            collapsed
                                ? "Expand sidebar"
                                : "Collapse sidebar"
                        }
                    >
                        <ChevronLeftIcon
                            sx={{
                                fontSize: 18,
                                transform: collapsed
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s"
                            }}
                        />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
    if (isMobile) {
        return (
            <>
                <IconButton
                    onClick={() => setMobileOpen(true)}
                    sx={{
                        position: "fixed",
                        top: 12,
                        left: 12,
                        zIndex: 1300,
                        bgcolor: "#1A202C",
                        color: "#fff",
                        width: 44,
                        height: 44,
                        boxShadow: 3,
                        "&:hover": {
                            bgcolor: "#2D3748"
                        }
                    }}
                    aria-label="Open workspace menu"
                >
                    <MenuRoundedIcon />
                </IconButton>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        zIndex: 1400,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            bgcolor: "#1A202C",
                            color: "#fff",
                            boxSizing: "border-box"
                        }
                    }}
                >
                    {sidebarContent}
                </Drawer>
            </>
        );
    }
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: collapsed
                    ? collapsedWidth
                    : drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: collapsed
                        ? collapsedWidth
                        : drawerWidth,
                    bgcolor: "#1A202C",
                    color: "#fff",
                    borderRight: "1px solid #2D3748",
                    transition: "width 0.3s ease",
                    overflow: "hidden",
                    boxSizing: "border-box"
                }
            }}
        >
            {sidebarContent}
        </Drawer>
    );
}