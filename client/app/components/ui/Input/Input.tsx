"use client";

import {
    TextField,
    TextFieldProps
} from "@mui/material";

export default function Input(props: TextFieldProps) {

    return (

        <TextField

            fullWidth

            size="medium"

            sx={{

                "& .MuiOutlinedInput-root": {

                    borderRadius: 3,

                    background: "#fff"

                }

            }}

            {...props}

        />

    );

}