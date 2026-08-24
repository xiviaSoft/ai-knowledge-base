"use client";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import { Button } from "../ui";

interface DeleteWorkspaceDialogProps {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    onDelete: () => void | Promise<void>;
}

export default function DeleteWorkspaceDialog({
    open,
    loading = false,
    onClose,
    onDelete
}: DeleteWorkspaceDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
        >
            <DialogTitle>
                Delete Workspace
            </DialogTitle>

            <DialogContent>
                <Typography>
                    This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onDelete}
                    disabled={loading}
                >
                    {loading
                        ? "Deleting..."
                        : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}