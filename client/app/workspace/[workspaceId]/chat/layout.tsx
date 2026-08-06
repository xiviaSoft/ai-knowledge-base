"use client";

import { Box } from "@mui/material";

export default function Layout({ children }: any) {

    return (
        <Box
            sx={{
                height: "calc(100vh - 64px)",
                overflow: 'hidden'
            }}>
            {children}
        </Box>

    )




}