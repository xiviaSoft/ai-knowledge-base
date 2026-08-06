"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    Typography,
    Stack,
    Box,
    IconButton
} from "@mui/material";

import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Button, Input } from "../ui";

import workspaceService from "../../services/workspace.service";

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

            maxWidth="sm"

            fullWidth

        >

            <DialogContent sx={{ p: 4 }}>

                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >

                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >

                        <Box

                            sx={{

                                width: 56,

                                height: 56,

                                borderRadius: 3,

                                bgcolor: "primary.main",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                color: "#fff"

                            }}

                        >

                            <FolderRoundedIcon />

                        </Box>

                        <Box>

                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 700 }}
                            >

                                New Workspace

                            </Typography>

                            <Typography

                                color="text.secondary"

                            >

                                Create a workspace for your AI documents.

                            </Typography>

                        </Box>

                    </Box>

                    <IconButton onClick={onClose}>

                        <CloseRoundedIcon />

                    </IconButton>

                </Stack>

                <Box sx={{ mt: 4 }}>

                    <Input

                        label="Workspace Name"

                        placeholder="Example: AI Research"

                        value={name}

                        onChange={(e: any) =>

                            setName(e.target.value)

                        }

                    />

                </Box>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: 'flex-end', mt: 5 }}
                >

                    <Button

                        variant="outlined"

                        onClick={onClose}

                    >

                        Cancel

                    </Button>

                    <Button

                        variant="contained"

                        disabled={loading}

                        onClick={handleCreate}

                    >

                        {

                            loading

                                ? "Creating..."

                                : "Create Workspace"

                        }

                    </Button>

                </Stack>

            </DialogContent>

        </Dialog>

    );

}