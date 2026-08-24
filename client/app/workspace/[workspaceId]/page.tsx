"use client";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import useWorkspaceDashboard from "@/app/hooks/useWorkspaceDashboard";
import { Alert, Box, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
export default function DashboardPage() {
    const params = useParams();
    const workspaceId = params.workspaceId as string;
    const {
        data,
        activities,
        loading,
        activityLoading,
        error
    } = useWorkspaceDashboard(workspaceId);
    return (
        <Box
            sx={{
                minHeight: "100%",
                backgroundColor: "#F6F8FC",
                py: 4
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 700 }}
                    >
                        {data?.workspace?.name || "Workspace"}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Overview of your workspace activity.
                    </Typography>
                </Box>
                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                    >
                        {error}
                    </Alert>
                )}
                <DashboardStats
                    data={data}
                    loading={loading}
                />
                <Box sx={{ mt: 3 }}>
                    <RecentActivity
                        activities={activities}
                        loading={activityLoading}
                    />
                </Box>
            </Container>
        </Box>
    );
}