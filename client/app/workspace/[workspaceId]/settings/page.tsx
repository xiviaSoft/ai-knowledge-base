"use client";

import { useParams } from "next/navigation";
import {
    Alert,
    Box,
    Stack,
    Typography
} from "@mui/material";
import Loader from "@/app/components/ui/Loader";
import WorkspaceSettingsForm from "@/app/components/workspace/WorkspaceSettingsForm";
import DangerZone from "@/app/components/workspace/DangerZone";
import useWorkspaceSettings from "@/app/hooks/useWorkspaceSettings";
import { useAuth } from "@/app/contexts/AuthContext";

export default function SettingsPage() {
    const params = useParams();
    const workspaceId = params.workspaceId as string;
    const { user } = useAuth();
    const {
        workspace,
        name,
        loading,
        saving,
        error,
        success,
        updateName,
        saveSettings
    } = useWorkspaceSettings(workspaceId);

    if (loading) {
        return <Loader />;
    }

    if (error && !workspace) {
        return (
            <Box>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!workspace) {
        return (
            <Box>
                <Alert severity="error">
                    Workspace not found.
                </Alert>
            </Box>
        );
    }

    const isOwner =
        !!user?.id &&
        user.id === workspace.owner_id;

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 4
                }}
            >
                Workspace Settings
            </Typography>

            <Stack spacing={4}>
                <WorkspaceSettingsForm
                    workspace={workspace}
                    name={name}
                    saving={saving}
                    error={error}
                    success={success}
                    isOwner={isOwner}
                    onNameChange={updateName}
                    onSave={saveSettings}
                />

                <DangerZone
                    workspaceId={workspace.id}
                    isOwner={isOwner}
                />
            </Stack>
        </Box>
    );
}