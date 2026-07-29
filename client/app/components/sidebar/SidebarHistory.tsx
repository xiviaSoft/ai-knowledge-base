"use client";

import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";


const history = [
    "What is Node.js?",
    "Explain React",
    "Interrupt Flag",
    "What is RAG?",
];

export default function SidebarHistory() {

    return (

        <Box
            sx={{
                flex: 1,
                overflowY: "auto",
                px: 2,
            }}
        >

            <List>

                {history.map((item) => (

                    <ListItemButton
                        key={item}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                        }}
                    >
                        <ListItemIcon>

                            {/* <
                                sx={{ color: "white" }}
                            /> */}

                        </ListItemIcon>

                        <ListItemText
                            primary={item}
                        />

                    </ListItemButton>

                ))}

            </List>

        </Box>

    );

}