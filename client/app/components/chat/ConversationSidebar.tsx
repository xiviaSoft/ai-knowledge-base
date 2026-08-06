"use client";

import {
    Paper,
    Button,
    TextField,
    Typography,
    Stack,
    InputAdornment
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function ConversationSidebar({

    conversations,

    onNewChat

}: any) {

    return (

        <Paper
            square
            sx={{
                width: 280,
                p: 2,
                borderRight: "1px solid #ECECEC",
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >

            <TextField
                size="small"
                placeholder="Search conversations"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon />
                            </InputAdornment>
                        )
                    }
                }}

            />

            <Button

                variant="contained"

                fullWidth

                sx={{
                    borderRadius: 3,
                    py: 1.2
                }}

                onClick={onNewChat}

            >

                New Chat

            </Button>

            <Typography
                sx={{ fontWeight: 700 }}
            >

                Today

            </Typography>

            <Stack spacing={1}>

                {

                    conversations.map((chat: any) => (

                        <Paper

                            key={chat.id}

                            sx={{
                                p: 2,
                                cursor: "pointer",
                                borderRadius: 3,
                                transition: ".2s",

                                "&:hover": {

                                    transform: "translateX(4px)"

                                }

                            }}

                        >

                            <Typography
                                sx={{ fontWeight: 600 }}
                            >

                                {chat.title}

                            </Typography>

                        </Paper>

                    ))

                }

            </Stack>

        </Paper>

    );

}