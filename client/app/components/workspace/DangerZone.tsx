"use client";

import { useState } from "react";
import {
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "../ui";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";
import workspaceService from "@/app/services/workspace.service";

interface DangerZoneProps {
    workspaceId: string;
    isOwner: boolean;
}

export default function DangerZone({
    workspaceId,
    isOwner
}: DangerZoneProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleDelete = async () => {
        if (!isOwner) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            await workspaceService.delete(
                workspaceId
            );

            router.push("/dashboard");
        } catch (error) {
            console.error(
                "Failed to delete workspace:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete workspace."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOwner) {
        return null;
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
                variant="h5"
                color="error"
                sx={{
                    fontWeight: 700
                }}
            >
                Danger Zone
            </Typography>

            <Typography
                color="text.secondary"
                sx={{
                    mt: 2
                }}
            >
                Permanently delete this workspace.
                This action cannot be undone.
            </Typography>

            <Stack sx={{ mt: 3 }}>
                <Button
                    color="error"
                    variant="contained"
                    onClick={() =>
                        setOpen(true)
                    }
                    disabled={loading}
                >
                    Delete Workspace
                </Button>
            </Stack>

            {error && (
                <Typography
                    color="error"
                    variant="body2"
                    sx={{
                        mt: 2
                    }}
                >
                    {error}
                </Typography>
            )}

            <DeleteWorkspaceDialog
                open={open}
                loading={loading}
                onClose={() => {
                    if (!loading) {
                        setOpen(false);
                    }
                }}
                onDelete={handleDelete}
            />
        </Paper>
    );
}