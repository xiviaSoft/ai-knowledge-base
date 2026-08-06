"use client";

import { useState } from "react";
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
    Paper
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useAuth } from "@/app/contexts/AuthContext";
export default function WorkspaceNavbar() {

    const { user, logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (

        <AppBar

            // elevation={0}

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
                    sx={{ fontSize: 20, fontWeight: 700 }}
                >

                    AI Knowledge Base

                </Typography>

                <Paper

                    sx={{

                        display: "flex",

                        alignItems: "center",

                        width: 350,

                        px: 2,

                        py: .8,

                        borderRadius: 3,

                        boxShadow: "none",

                        border: "1px solid",

                        borderColor: "divider"

                    }}

                >

                    <SearchRoundedIcon

                        color="action"

                    />

                    <InputBase

                        placeholder="Search..."

                        sx={{

                            ml: 1,

                            flex: 1

                        }}

                    />

                </Paper>

                <Box

                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >

                    <IconButton>

                        <NotificationsNoneRoundedIcon />

                    </IconButton>

                    <Box
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                        onClick={(e) => setAnchorEl(e.currentTarget)}

                    >

                        <Avatar>

                            {user?.first_name?.charAt(0) || "U"}

                        </Avatar>

                        <Box sx={{ ml: 1 }}>

                            <Typography
                                sx={{ fontWeight: 600 }}
                            >

                                {user?.first_name || "User"}

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

                <MenuItem

                    onClick={logout}

                >

                    Logout

                </MenuItem>

            </Menu>

        </AppBar>

    );

}