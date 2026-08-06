"use client";

import {
    Button as MuiButton,
    ButtonProps
} from "@mui/material";

export default function Button(props: ButtonProps) {

    return (

        <MuiButton

            disableElevation

            sx={{

                borderRadius: 3,

                textTransform: "none",

                fontWeight: 600,

                px: 3,

                py: 1.4,

                ...props.sx

            }}

            {...props}

        />

    );

}