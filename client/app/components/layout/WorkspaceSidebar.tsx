"use client";

import { Drawer, Toolbar, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
const drawerWidth = 260;

export default function WorkspaceSidebar() {
    const pathname = usePathname();
    const { workspaceId } = useParams();
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
            title: "API Keys",
            icon: <KeyRoundedIcon />,
            href: `/workspace/${workspaceId}/api-keys`
        },

        {
            title: "Settings",
            icon: <SettingsRoundedIcon />,
            href: `/workspace/${workspaceId}/settings`
        }

    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 270,
                "& .MuiDrawer-paper": {
                    width: 270,
                    bgcolor: "#111827",
                    color: "#fff",
                    borderRight: "none",
                    p: 2
                }
            }}
        >
            <Toolbar>

                <Typography
                    variant="h6"
                >
                    AI Knowledge Base
                </Typography>

            </Toolbar>

            <List>
                {
                    menu.map((item) => (

                        <ListItemButton
                            key={item.href}
                            component={Link}
                            href={item.href}
                            selected={pathname === item.href}

                            sx={{
                                borderRadius: 3,
                                mb: 1,
                                transition: ".2s",
                                "&:hover": {
                                    transform: "translateX(4px)"
                                },
                                "&.Mui-selected": {
                                    transform: "translateX(4px)"
                                }
                            }}
                        >

                            <ListItemText

                                primary={item.title}

                            />

                        </ListItemButton>

                    ))

                }

            </List>
        </Drawer>
    );

}