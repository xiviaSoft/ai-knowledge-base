"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Stack } from "@mui/material";

import OverviewHeader from "@/app/components/workspace/OverviewHeader";
import OverviewStats from "@/app/components/workspace/OverviewStats";
import QuickActions from "@/app/components/workspace/QuickActions";
import RecentActivity from "@/app/components/workspace/RecentActivity";
import Loader from "@/app/components/ui/Loader";

import workspaceService from "@/app/services/workspace.service";
import dashboardService from "@/app/services/dashboard.service";

export default function WorkspaceHome() {
    const { workspaceId } = useParams();
    const [loading, setLoading] = useState(true);
    const [workspace, setWorkspace] = useState<any>(null);
    const [stats, setStats] = useState({
        documents: 0,
        members: 0,
        chats: 0,
        apiKeys: 0
    });
    const [activities, setActivities] = useState([]);
    useEffect(() => {

        if (workspaceId) {

            loadWorkspace();

        }

    }, [workspaceId]);
    async function loadWorkspace() {

        try {
            setLoading(true);
            const [workspaceResponse, dashboardResponse] = await Promise.all([
                workspaceService.getById(workspaceId as string),
                dashboardService.getDashboard(workspaceId as string)
            ]);
            setWorkspace(workspaceResponse.data);
            setStats({
                documents: dashboardResponse.data.documents,
                members: dashboardResponse.data.members,
                chats: dashboardResponse.data.chats,
                apiKeys: dashboardResponse.data.apiKeys
            });
            setActivities(
                dashboardResponse.data.activities || []
            );

        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {

        return <Loader />;

    }

    return (

        <Box
            sx={{
                maxWidth: 1500,
                mx: "auto",
                py: 4
            }}
        >

            <OverviewHeader

                workspace={workspace}

            />

            <OverviewStats

                stats={stats}

            />

            <Stack spacing={4} sx={{ mt: 4 }}>

                <QuickActions
                    workspaceId={workspaceId}
                />

                <RecentActivity

                    activities={activities}

                />

            </Stack>

        </Box>

    );

}