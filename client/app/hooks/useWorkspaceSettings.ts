"use client";
import workspaceService, { UpdateWorkspacePayload, Workspace } from "@/app/services/workspace.service";
import { useCallback, useEffect, useState } from "react";

export default function useWorkspaceSettings(
    workspaceId: string
) {

    const [workspace, setWorkspace] = useState<Workspace | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    const fetchWorkspace = useCallback(async () => {

        if (!workspaceId) {
            setWorkspace(null);
            setLoading(false);
            return;
        }

        try {

            setLoading(true);
            setError("");
            setSuccess("");

            const data =
                await workspaceService.getById(
                    workspaceId
                );

            setWorkspace(data);
            setName(data?.name || "");

        } catch (error: any) {

            console.error(
                "Failed to fetch workspace:",
                error
            );

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to load workspace settings."
            );

        } finally {

            setLoading(false);

        }

    }, [workspaceId]);

    useEffect(() => {

        fetchWorkspace();

    }, [fetchWorkspace]);

    const updateName = (
        value: string
    ) => {

        setName(value);
        setSuccess("");
        setError("");

    };

    const saveSettings = async () => {

        const trimmedName =
            name.trim();

        if (!trimmedName) {

            setError(
                "Workspace name is required."
            );

            return;

        }

        if (trimmedName === workspace?.name) {

            setSuccess(
                "No changes to save."
            );

            return;

        }

        const payload:
            UpdateWorkspacePayload = {
            name: trimmedName
        };

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            const updatedWorkspace =
                await workspaceService.update(
                    workspaceId,
                    payload
                );

            setWorkspace(
                updatedWorkspace
            );

            setName(
                updatedWorkspace.name
            );

            setSuccess(
                "Workspace settings updated successfully."
            );

        } catch (error: any) {

            console.error(
                "Failed to update workspace:",
                error
            );

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update workspace settings."
            );

        } finally {

            setSaving(false);

        }

    };

    return {
        workspace,
        name,
        loading,
        saving,
        error,
        success,
        updateName,
        saveSettings,
        fetchWorkspace
    };
}
