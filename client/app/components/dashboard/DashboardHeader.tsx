"use client";

import { Box, Typography } from "@mui/material";

export default function DashboardHeader() {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (

        <Box  sx={{mb:5}}>

            <Typography
                variant="h4"
                sx={{fontweight:700}}
            >

                {greeting}

            </Typography>

            <Typography color="text.secondary">

                Welcome back to your AI Knowledge Base.

            </Typography>

        </Box>

    );

}