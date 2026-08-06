"use client";

import {

    Dialog,

    DialogTitle,

    DialogContent,

    DialogActions,

    Typography

} from "@mui/material";

import { Button } from "../ui";

export default function DeleteWorkspaceDialog({

    open,

    onClose,

    onDelete

}: any) {

    return (

        <Dialog

            open={open}

            onClose={onClose}

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

                >

                    Cancel

                </Button>

                <Button

                    color="error"

                    variant="contained"

                    onClick={onDelete}

                >

                    Delete

                </Button>

            </DialogActions>

        </Dialog>

    );

}