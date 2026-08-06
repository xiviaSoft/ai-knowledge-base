"use client";
import WorkspaceSettingsForm from "@/app/components/workspace/WorkspaceSettingsForm";
import DangerZone from "@/app/components/workspace/DangerZone";
import workspaceService from "@/app/services/workspace.service";
import { Box, Typography, Stack } from "@mui/material";
import Loader from "@/app/components/ui/Loader";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SettingsPage() {

    const { workspaceId } = useParams();

    const [workspace, setWorkspace] = useState<any>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadWorkspace();

    }, []);

    async function loadWorkspace() {
        try {
            const response = await workspaceService.getById(
                workspaceId as string
            );
            setWorkspace(response.data);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loader />;

    }

    return (

        <Box>

            <Typography
                sx={{ fontWeight: 700, mb: 4 }}
                variant="h4"
            >

                Workspace Settings

            </Typography>

            <Stack spacing={4}>

                <WorkspaceSettingsForm

                    workspace={workspace}

                    onUpdated={loadWorkspace}

                />

                <DangerZone

                    workspaceId={workspace.id}

                />

            </Stack>

        </Box>

    );

}