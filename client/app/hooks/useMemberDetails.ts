"use client";
import { useCallback, useEffect, useState } from "react";
import memberService from "@/app/services/member.service";

export default function useMemberDetails(workspaceId: string, memberId: string) {
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadMember = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await memberService.getById(
                    workspaceId,
                    memberId
                );

            setMember(response.data);
        } catch (error) {
            console.error(
                "Failed to load member:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load member."
            );
        } finally {
            setLoading(false);
        }
    }, [workspaceId, memberId]);

    useEffect(() => {
        if (workspaceId && memberId) {
            loadMember();
        }
    }, [
        workspaceId,
        memberId,
        loadMember
    ]);

    return {
        member,
        loading,
        error,
        reload: loadMember
    };
}