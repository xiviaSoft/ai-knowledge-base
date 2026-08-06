"use client";

import { Box } from "@mui/material";

export default function ChatLayout({ sidebar, header, messages, input }: any) {
    return (

        <Box
            sx={{
                display: "flex",
                height: "calc(100vh)",
                overflow: "hidden",
                bgcolor: "#F6F8FC"
            }}
        >

            {sidebar}

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {header}

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: 5,
                        py: 4
                    }}
                >

                    {messages}

                </Box>

                {input}

            </Box>

        </Box>

    );

}