"use client";

import { Box } from "@mui/material";

export default function Layout({ children }: any) {

    return (
        <Box
            sx={{
                height: "100vh",
            }}>
            {children}
        </Box>

    )




}