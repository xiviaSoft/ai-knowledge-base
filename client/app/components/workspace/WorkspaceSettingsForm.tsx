"use client";

import {
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { Input, Button } from "../ui";
import type {
    Workspace
} from "@/app/services/workspace.service";

interface WorkspaceSettingsFormProps {
    workspace: Workspace;
    name: string;
    saving: boolean;
    error: string;
    success: string;
    isOwner: boolean;
    onNameChange: (value: string) => void;
    onSave: () => void;
}

export default function WorkspaceSettingsForm({
    workspace,
    name,
    saving,
    error,
    success,
    isOwner,
    onNameChange,
    onSave
}: WorkspaceSettingsFormProps) {
    return (
        <Paper
            sx={{
                p: 4,
                borderRadius: 4
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 4,
                    fontWeight: 700
                }}
            >
                General
            </Typography>

            <Stack spacing={3}>
                <Input
                    label="Workspace Name"
                    value={name}
                    onChange={(event) =>
                        onNameChange(
                            event.target.value
                        )
                    }
                    disabled={
                        saving ||
                        !isOwner
                    }
                />

                <Input
                    label="Workspace Slug"
                    value={workspace.slug || ""}
                    disabled
                />

                <Input
                    label="Plan"
                    value={workspace.plan || "Free"}
                    disabled
                />

                <Input
                    label="Created"
                    value={
                        workspace.created_at
                            ? new Date(
                                  workspace.created_at
                              ).toLocaleDateString()
                            : ""
                    }
                    disabled
                />

                {!isOwner && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Only the workspace owner can modify
                        workspace settings.
                    </Typography>
                )}

                {error && (
                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {error}
                    </Typography>
                )}

                {success && (
                    <Typography
                        color="success.main"
                        variant="body2"
                    >
                        {success}
                    </Typography>
                )}

                {isOwner && (
                    <Button
                        variant="contained"
                        onClick={onSave}
                        disabled={
                            saving ||
                            !name.trim()
                        }
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                )}
            </Stack>
        </Paper>
    );
}