"use client";

import {

    Box,

    Typography

} from "@mui/material";

export default function PageHeader({

    title,

    subtitle,

    action

}: any) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4
            }}
        >

            <Box>

                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, }}
                >

                    {title}

                </Typography>

                {subtitle && (

                    <Typography

                        color="text.secondary"

                    >

                        {subtitle}

                    </Typography>

                )}

            </Box>

            {action}

        </Box>

    );

}