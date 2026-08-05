"use client";

import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";
import workspaceService from "@/app/services/workspace.service";


export default function CreateWorkspaceDialog({

    open,

    onClose,

    onCreated

}: any) {

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleCreate() {

        if (!name.trim()) return;

        try {

            setLoading(true);

            await workspaceService.create({

                name

            });

            setName("");

            onCreated();

            onClose();

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                Create Workspace

            </DialogTitle>

            <DialogContent>

                <TextField
                    autoFocus
                    fullWidth
                    margin="normal"
                    label="Workspace Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={loading}
                >

                    Create

                </Button>

            </DialogActions>

        </Dialog>

    );

}