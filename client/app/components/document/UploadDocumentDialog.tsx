"use client";

import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Stack
} from "@mui/material";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

import { Button } from "../ui";
import documentService from "@/app/services/document.service";

export default function UploadDocumentDialog({

    open,

    onClose,

    workspaceId,

    onUploaded

}: any) {

    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    async function handleUpload() {

        if (!file) return;

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", file);

            formData.append("workspaceId", workspaceId);

            await documentService.upload(formData);

            onUploaded();

            onClose();

            setFile(null);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <Dialog

            open={open}

            onClose={onClose}

            maxWidth="sm"

            fullWidth

        >

            <DialogTitle>

                Upload Document

            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} sx={{ mt: 1 }}>

                    <Typography color="text.secondary">

                        Upload a PDF document to your knowledge base.

                    </Typography>

                    <Button

                        component="label"

                        variant="outlined"

                        startIcon={<UploadFileRoundedIcon />}

                    >

                        Choose PDF

                        <input

                            hidden

                            type="file"

                            accept=".pdf"

                            onChange={(e) => {

                                if (e.target.files?.length) {

                                    setFile(e.target.files[0]);

                                }

                            }}

                        />

                    </Button>

                    {

                        file && (

                            <Typography>

                                Selected:

                                {" "}

                                <strong>

                                    {file.name}

                                </strong>

                            </Typography>

                        )

                    }

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button

                    variant="outlined"

                    onClick={onClose}

                >

                    Cancel

                </Button>

                <Button

                    variant="contained"

                    disabled={!file || loading}

                    onClick={handleUpload}

                >

                    {

                        loading

                            ? "Uploading..."

                            : "Upload"

                    }

                </Button>

            </DialogActions>

        </Dialog>

    );

}