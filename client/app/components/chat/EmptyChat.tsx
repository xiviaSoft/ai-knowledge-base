"use client";

import { Box, Typography } from "@mui/material";

export default function EmptyChat() {

    return (

        <Box

            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%"
            }}

        >

            <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
            >

                Ask anything

            </Typography>

            <Typography

                color="text.secondary"

            >

                Your uploaded documents will be used to answer.

            </Typography>

        </Box>

    );

}