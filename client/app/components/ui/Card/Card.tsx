"use client";

import {
    Card as MuiCard,
    CardProps
} from "@mui/material";

export default function Card(props: CardProps) {

    return (

        <MuiCard

            elevation={0}

            sx={{

                borderRadius: 4,

                border: "1px solid #E5E7EB",

                boxShadow: "0 4px 12px rgba(0,0,0,.05)",

                ...props.sx

            }}

            {...props}

        />

    );

}