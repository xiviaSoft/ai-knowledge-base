"use client";

import { AppBar, Toolbar, Typography, Box, Button} from "@mui/material";
import { useAuth } from "@/app/contexts/AuthContext";


export default function WorkspaceNavbar() {

    const { logout } = useAuth();

    return (

        <AppBar

            position="fixed"

            sx={{

                zIndex: 1201

            }}

        >

            <Toolbar>

                <Typography

                    variant="h6"

                    sx={{

                        flexGrow: 1

                    }}

                >

                    Workspace

                </Typography>

                <Button

                    color="inherit"

                    onClick={logout}

                >

                    Logout

                </Button>

            </Toolbar>

        </AppBar>

    );

}