"use client";

import type { ChangeEventHandler } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment } from "@mui/material";
import { Input } from "../ui";

interface DocumentSearchProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function DocumentSearch({ value, onChange }: DocumentSearchProps) {

    return (

        <Input

            placeholder="Search documents..."

            value={value}
            onChange={onChange}
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

    );

}