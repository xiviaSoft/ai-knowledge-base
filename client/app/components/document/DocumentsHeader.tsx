"use client";

import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { Stack, Typography } from "@mui/material";
import { Button } from "../ui";

export default function DocumentsHeader({

    onUpload

}: {

    onUpload: () => void

}) {

    return (

        <Stack
            direction="row"
            sx={{ mb: 4, justifyContent: 'space-between', alignItems: 'center' }}
        >

            <div>

                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700 }}
                >

                    Documents

                </Typography>

                <Typography

                    color="text.secondary"

                >

                    Upload and manage your knowledge base.

                </Typography>

            </div>

            <Button
                variant="contained"
                startIcon={<UploadRoundedIcon />}
                onClick={onUpload}
            >

                Upload Document

            </Button>

        </Stack>

    );

}