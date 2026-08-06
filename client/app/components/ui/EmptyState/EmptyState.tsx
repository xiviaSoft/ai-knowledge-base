"use client";

import {

    Box,

    Typography

} from "@mui/material";

export default function EmptyState({

    title,

    description

}: any) {

    return (

        <Box
            sx={{ textAlign: "center", py: 10 }}
        >

            <Typography
                variant="h5"
                sx={{ fontWeight: 600, }}
            >

                {title}

            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
            >

                {description}

            </Typography>

        </Box>

    );

}