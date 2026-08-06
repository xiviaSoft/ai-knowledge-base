"use client";

import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";

export default function MessageList({

    messages

}: any) {

    return (

        <Box>

            {

                messages.map((message: any) => (

                    <MessageBubble

                        key={message.id}

                        message={message}

                    />

                ))

            }

        </Box>

    );

}