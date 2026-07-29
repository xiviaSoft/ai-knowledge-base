"use client";

import {
    Box,
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SidebarFooter() {

    return (

        <Box>

            <Divider sx={{ bgcolor: "rgba(255,255,255,.1)" }} />

            <ListItemButton>

                <ListItemIcon>

                    <DarkModeIcon
                        sx={{ color: "white" }}
                    />

                </ListItemIcon>

                <ListItemText
                    primary="Dark Mode"
                />

            </ListItemButton>

            <ListItemButton>

                <ListItemIcon>

                    <SettingsIcon
                        sx={{ color: "white" }}
                    />

                </ListItemIcon>

                <ListItemText
                    primary="Settings"
                />

            </ListItemButton>

        </Box>

    );

}