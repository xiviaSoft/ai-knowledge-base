"use client";

import { Box, Typography } from "@mui/material"

export default function OverviewHeader({ workspace }: any) {
    return (

        <Box sx={{ mb: 5 }}>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
            >
                {workspace.name}
            </Typography>

            <Typography
                sx={{ mt: 1 }}
                color="text.secondary"
            >
                Manage your AI Knowledge Base workspace.
            </Typography>
        </Box>

    );

}