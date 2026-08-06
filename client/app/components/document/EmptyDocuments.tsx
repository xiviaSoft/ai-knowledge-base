"use client";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { Box, Typography } from "@mui/material";

export default function EmptyDocuments() {

    return (

        <Box
            sx={{ py: 10, textAlign: "center" }}
        >

            <DescriptionRoundedIcon

                sx={{

                    fontSize: 80,

                    color: "#CBD5E1"

                }}

            />

            <Typography
                variant="h5"
                sx={{ fontWeight: 700, mt: 2 }}
            >

                No documents uploaded

            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
            >

                Upload your first PDF to begin using AI.

            </Typography>

        </Box>

    );

}