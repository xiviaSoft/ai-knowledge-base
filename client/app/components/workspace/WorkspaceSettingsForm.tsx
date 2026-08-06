"use client";

import { useState } from "react";

import {
    Paper,
    Stack,
    Typography
} from "@mui/material";

import { Button, Input } from "../ui";
import workspaceService from "@/app/services/workspace.service";

export default function WorkspaceSettingsForm({

    workspace,

    onUpdated

}: any) {

    const [name, setName] = useState(workspace.name);

    const [description, setDescription] = useState(

        workspace.description || ""

    );

    const [loading, setLoading] = useState(false);

    async function handleSave() {

        try {

            setLoading(true);

            await workspaceService.update(

                workspace.id,

                {

                    name,

                    description

                }

            );

            onUpdated();

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <Paper

            sx={{

                p: 4,

                borderRadius: 4

            }}

        >

            <Typography
                sx={{ mb: 4, fontqWeight: 700 }}
                variant="h5"
            >

                General

            </Typography>

            <Stack spacing={3}>

                <Input

                    label="Workspace Name"

                    value={name}

                    onChange={(e: any) =>

                        setName(e.target.value)

                    }

                />

                <Input

                    label="Description"

                    multiline

                    rows={4}

                    value={description}

                    onChange={(e: any) =>

                        setDescription(e.target.value)

                    }

                />

                <Button

                    variant="contained"

                    onClick={handleSave}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Saving..."

                            : "Save Changes"

                    }

                </Button>

            </Stack>

        </Paper>

    );

}