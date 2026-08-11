"use client";

import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Stack,
    LinearProgress,
    Alert
} from "@mui/material";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

import { Button } from "../ui";

import documentService from "@/app/services/document.service";


interface UploadDocumentDialogProps {
    open: boolean;
    onClose: () => void;
    workspaceId: string;
    onUploaded: () => void;
}


export default function UploadDocumentDialog({
    open,
    onClose,
    workspaceId,
    onUploaded
}: UploadDocumentDialogProps) {

    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);

    const [error, setError] =
        useState("");


    /*
     * Handle file selection
     */
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        setError("");

        const selectedFile =
            event.target.files?.[0];

        if (!selectedFile) {
            return;
        }


        /*
         * Validate PDF
         */
        const isPDF =
            selectedFile.type === "application/pdf" ||
            selectedFile.name
                .toLowerCase()
                .endsWith(".pdf");


        if (!isPDF) {

            setError(
                "Only PDF documents are supported."
            );

            setFile(null);

            return;
        }

        const maxSize =
            10 * 1024 * 1024;


        if (selectedFile.size > maxSize) {

            setError(
                "The PDF must be smaller than 10 MB."
            );

            setFile(null);

            return;
        }


        setFile(selectedFile);
    };


    /*
     * Upload document
     */
    const handleUpload = async () => {

        if (!file) {
            return;
        }

        if (!workspaceId) {
            setError("Workspace ID is missing.");
            return;
        }

        try {

            setLoading(true);
            setProgress(0);
            setError("");

            const formData = new FormData();

            formData.append("file", file);
            formData.append("workspaceId", workspaceId);


            // DEBUG
            console.log(
                "========== FRONTEND DOCUMENT UPLOAD =========="
            );

            console.log(
                "Workspace ID:",
                workspaceId
            );

            console.log(
                "File:",
                file
            );

            console.log(
                "FormData workspaceId:",
                formData.get("workspaceId")
            );

            console.log(
                "FormData file:",
                formData.get("file")
            );

            console.log(
                "Is FormData:",
                formData instanceof FormData
            );


            await documentService.upload(
                formData,
                (uploadProgress) => {

                    setProgress(
                        uploadProgress
                    );

                }
            );

            onUploaded();

            setFile(null);
            setProgress(0);

            onClose();

        } catch (error: any) {

            console.error(
                "Document upload failed:",
                error
            );

            const message =
                error?.response?.data?.message ||
                "Failed to upload document. Please try again.";

            setError(message);

        } finally {

            setLoading(false);

        }

    };

    /*
     * Close dialog and reset state
     */
    const handleClose = () => {

        if (loading) {
            return;
        }

        setFile(null);

        setProgress(0);

        setError("");

        onClose();

    };


    return (

        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>
                Upload Document
            </DialogTitle>


            <DialogContent>

                <Stack
                    spacing={3}
                    sx={{
                        mt: 1
                    }}
                >

                    <Typography
                        color="text.secondary"
                    >
                        Upload a PDF document to
                        your workspace knowledge base.
                    </Typography>


                    {error && (

                        <Alert
                            severity="error"
                            onClose={() =>
                                setError("")
                            }
                        >
                            {error}
                        </Alert>

                    )}


                    <Button
                        component="label"
                        variant="outlined"
                        disabled={loading}
                        startIcon={
                            <UploadFileRoundedIcon />
                        }
                    >

                        Choose PDF

                        <input
                            hidden
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={
                                handleFileChange
                            }
                        />

                    </Button>


                    {file && (

                        <Stack spacing={1}>

                            <Typography
                                variant="body2"
                            >

                                Selected:

                                {" "}

                                <strong>
                                    {file.name}
                                </strong>

                            </Typography>


                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Size:{" "}
                                {(
                                    file.size /
                                    (1024 * 1024)
                                ).toFixed(2)}
                                {" "}MB
                            </Typography>

                        </Stack>

                    )}


                    {loading && (

                        <Stack spacing={1}>

                            <LinearProgress
                                variant="determinate"
                                value={progress}
                            />

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Uploading... {progress}%
                            </Typography>

                        </Stack>

                    )}

                </Stack>

            </DialogContent>


            <DialogActions>

                <Button
                    variant="outlined"
                    onClick={handleClose}
                    disabled={loading}
                >
                    Cancel
                </Button>


                <Button
                    variant="contained"
                    disabled={
                        !file ||
                        loading ||
                        !workspaceId
                    }
                    onClick={handleUpload}
                >

                    {loading
                        ? `Uploading ${progress}%`
                        : "Upload"}

                </Button>

            </DialogActions>

        </Dialog>

    );

}