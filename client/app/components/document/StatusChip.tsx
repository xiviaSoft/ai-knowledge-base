"use client";

import { Chip } from "@mui/material";

export default function StatusChip({

    status

}: any) {

    const colorMap: any = {

        READY: "success",

        PROCESSING: "warning",

        FAILED: "error",

        UPLOADING: "info"

    };

    return (

        <Chip

            label={status}

            color={colorMap[status] || "default"}

            size="small"

        />

    );

}