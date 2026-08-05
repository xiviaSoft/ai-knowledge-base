"use client";

import { Drawer, Toolbar, List, ListItemButton, ListItemText, Typography, Box} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
const drawerWidth = 260;

export default function WorkspaceSidebar({
    workspaceId
}: {

    workspaceId: string

}) {

    const pathname = usePathname();

    const menu = [

        {

            title: "Overview",

            href: `/workspace/${workspaceId}`

        },

        {

            title: "Documents",

            href: `/workspace/${workspaceId}/documents`

        },

        {

            title: "Chat",

            href: `/workspace/${workspaceId}/chat`

        },

        {

            title: "Members",

            href: `/workspace/${workspaceId}/members`

        },

        {

            title: "Settings",

            href: `/workspace/${workspaceId}/settings`

        }

    ];

    return (

        <Drawer

            variant="permanent"

            sx={{

                width: drawerWidth,

                "& .MuiDrawer-paper": {

                    width: drawerWidth

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