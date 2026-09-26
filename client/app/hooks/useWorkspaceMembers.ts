"use client";
import workspaceMemberService, {
    WorkspaceMember,
    WorkspaceMemberRole
} from "@/app/services/workspaceMember.service";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const getErrorMessage = (
    error: unknown,
    fallback: string
): string => {
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
    ) {
        const response = (
            error as {
                response?: {
                    data?: {
                        message?: unknown;
                    };
                };
            }
        ).response;
        if (
            typeof response?.data?.message === "string" &&
            response.data.message
        ) {
            return response.data.message;
        }
    }
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return fallback;
};

export default function useWorkspaceMembers(
    workspaceId: string
) {
    const { user } = useAuth();
    const [currentUserRole, setCurrentUserRole] = useState<WorkspaceMemberRole | null>(null);
    const [members, setMembers] = useState<WorkspaceMember[]>([]);
    const [actionLoading, setActionLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getCurrentUserId = (): string | null => {
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                return null;
            }
            const storedUserData = JSON.parse(storedUser);
            return storedUserData?.id || null;
        } catch (error) {
            console.error("Failed to read current user:", error);
            return null;
        }
    };

    const fetchMembers = useCallback(
        async () => {
            if (!workspaceId) {
                setMembers([]);
                setCurrentUserRole(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data = await workspaceMemberService.getMembers(
                    workspaceId
                );

                setMembers(data);

                const currentUserId = user?.id;

                if (!currentUserId) {
                    setCurrentUserRole(null);
                    return;
                }

                const currentMember = data.find(
                    (member) => member.user_id === currentUserId
                );

                setCurrentUserRole(
                    currentMember?.role || null
                );
            } catch (error: unknown) {
                console.error(
                    "Failed to fetch workspace members:",
                    error
                );

                setError(
                    getErrorMessage(
                        error,
                        "Failed to load workspace members."
                    )
                );

                setCurrentUserRole(null);
            } finally {
                setLoading(false);
            }
        },
        [workspaceId, user?.id]
    );

    useEffect(() => {
        fetchMembers();

        const handleWorkspaceMembershipUpdated = () => {
            fetchMembers();
        };

        window.addEventListener(
            "workspace:membership-updated",
            handleWorkspaceMembershipUpdated
        );

        return () => {
            window.removeEventListener(
                "workspace:membership-updated",
                handleWorkspaceMembershipUpdated
            );
        };
    }, [fetchMembers]);

    const updateRole = async (
        memberId: string,
        role: Exclude<
            WorkspaceMemberRole,
            "OWNER"
        >
    ) => {
        try {
            setActionLoading(true);
            setError("");

            const updatedMember =
                await workspaceMemberService.updateRole(
                    workspaceId,
                    memberId,
                    role
                );

            setMembers(
                (previousMembers) =>
                    previousMembers.map(
                        (member) =>
                            member.id === memberId
                                ? {
                                    ...member,
                                    ...updatedMember,
                                    role
                                }
                                : member
                    )
            );

            if (
                updatedMember.user_id ===
                getCurrentUserId()
            ) {
                setCurrentUserRole(role);
            }

            return updatedMember;
        } catch (error: unknown) {
            console.error(
                "Failed to update member role:",
                error
            );

            const message =
                getErrorMessage(
                    error,
                    "Failed to update member role."
                );

            setError(message);

            throw new Error(message);
        } finally {
            setActionLoading(false);
        }
    };

    const removeMember = async (
        memberId: string
    ): Promise<void> => {
        try {
            setActionLoading(true);
            setError("");

            await workspaceMemberService.removeMember(
                workspaceId,
                memberId
            );

            setMembers(
                (previousMembers) =>
                    previousMembers.filter(
                        (member) =>
                            member.id !== memberId
                    )
            );
        } catch (error: unknown) {
            console.error(
                "Failed to remove member:",
                error
            );

            const message =
                getErrorMessage(
                    error,
                    "Failed to remove member."
                );

            setError(message);

            throw new Error(message);
        } finally {
            setActionLoading(false);
        }
    };

    return {
        members,
        currentUserRole,
        loading,
        actionLoading,
        error,
        fetchMembers,
        updateRole,
        removeMember
    };
}