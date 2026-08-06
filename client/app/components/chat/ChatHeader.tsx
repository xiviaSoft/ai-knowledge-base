"use client";

import {

    Paper,
    Typography

} from "@mui/material";

export default function ChatHeader({

    title

}: any) {

    return (

        <Paper
            square
            sx={{
                p: 3,
                borderBottom: "1px solid #eee"
            }}
        >

            <Typography
                variant="h6"
                sx={{ fontWeight:700 }}
            >

                {title}

            </Typography>

        </Paper>

    );

}