"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatsCard({

    title,

    value,

    icon,

    color = "#2563EB"

}: any) {

    return (

        <Card
            sx={{
                borderRadius: 4,
                transition: ".25s",
                cursor: "pointer",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6
                }
            }}
        >

            <CardContent>

                <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >

                    <Box>

                        <Typography
                            color="text.secondary"
                            sx={{ fontSize: 14 }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, }}
                        >
                            {value}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "16px",
                            background: `${color}15`,
                            color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {icon}
                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}