"use client";

import { useState } from "react";

import {

    Paper,

    Typography,

    Stack

} from "@mui/material";

import { useRouter } from "next/navigation";

import { Button } from "../ui";

import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";

import workspaceService from "@/app/services/workspace.service";

export default function DangerZone({

    workspaceId

}: any) {

    const router = useRouter();

    const [open, setOpen] = useState(false);

    async function handleDelete() {

        await workspaceService.delete(workspaceId);

        router.push("/dashboard");

    }

    return (

        <Paper

            sx={{

                mt: 4,

                p: 4,

                borderRadius: 4,

                border: "1px solid",

                borderColor: "error.main"

            }}

        >

            <Typography
                sx={{ fontWeight: 700 }}
                variant="h5"
                color="error"
            >

                Danger Zone

            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mt: 2 }}
            >

                Permanently delete this workspace.

            </Typography>

            <Stack sx={{ mt: 3 }}>

                <Button

                    color="error"

                    variant="contained"

                    onClick={() =>

                        setOpen(true)

                    }

                >

                    Delete Workspace

                </Button>

            </Stack>

            <DeleteWorkspaceDialog

                open={open}

                onClose={() =>

                    setOpen(false)

                }

                onDelete={handleDelete}

            />

        </Paper>

    );

}