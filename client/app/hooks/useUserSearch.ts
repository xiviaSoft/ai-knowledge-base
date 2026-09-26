"use client";
import { useCallback, useEffect, useState } from "react";
import userService from "../services/user.service";

export interface WorkspaceUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string | null;
}

export default function useUserSearch(
    workspaceId: string
) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<WorkspaceUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchUsers = useCallback(async () => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setUsers([]);
            setError(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const results =
                await userService.searchUsers(
                    workspaceId,
                    trimmedQuery
                );

            setUsers(results || []);
        } catch (error: any) {
            setUsers([]);
            setError(
                error?.response?.data?.message ||
                "Failed to search users."
            );
        } finally {
            setLoading(false);
        }
    }, [workspaceId, query]);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchUsers();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchUsers]);

    const clearSearch = useCallback(() => {
        setQuery("");
        setUsers([]);
        setError(null);
    }, []);

    return {
        query,
        setQuery,
        users,
        loading,
        error,
        searchUsers,
        clearSearch
    };

}
