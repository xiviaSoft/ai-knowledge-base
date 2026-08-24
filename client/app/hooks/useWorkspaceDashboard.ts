"use client";
import { useEffect, useState } from "react";
import dashboardService from "@/app/services/dashboard.service";
export interface DashboardData {
    workspace: {
        id: string;
        name: string;
        plan: string;
    };
    documents: {
        total: number;
        ready: number;
        processing: number;
        failed: number;
    };
    conversations: number;
    members: number;
}
export default function useWorkspaceDashboard(workspaceId: string) {
    const [data, setData] = useState<DashboardData | null>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activityLoading, setActivityLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        if (!workspaceId) return;
        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await dashboardService.getDashboard(
                    workspaceId
                );
                setData(response.data);
            } catch (error: any) {
                console.error(
                    "Failed to load dashboard:",
                    error
                );
                setError(
                    error?.response?.data?.message ||
                    "Failed to load workspace dashboard."
                );
            } finally {
                setLoading(false);
            }
        };
        const loadActivity = async () => {
            try {
                setActivityLoading(true);
                const response =
                    await dashboardService.getRecentActivity(
                        workspaceId
                    );
                setActivities(response.data || []);
            } catch (error) {
                console.error(
                    "Failed to load recent activity:",
                    error
                );
            } finally {
                setActivityLoading(false);
            }
        };
        loadDashboard();
        loadActivity();
    }, [workspaceId]);
    return {
        data,
        activities,
        loading,
        activityLoading,
        error
    };
}