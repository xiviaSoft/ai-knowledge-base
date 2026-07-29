"use client";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function SidebarHeader() {
    return (
        <Box sx={{ p: 3 }}>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                }}
            >
                <SmartToyIcon sx={{ fontSize: 34 }} />

                <Typography
                    variant="h5"
                >
                    AI Knowledge
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                }}
            >
                New Chat
            </Button>

        </Box>
    );
}