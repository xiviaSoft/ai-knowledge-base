"use client";
import searchService, { SearchResults } from "@/app/services/search.service";
import { useEffect, useState } from "react";

export default function useWorkspaceSearch(
    workspaceId: string,
    keyword: string
) {
    const [results, setResults] = useState<SearchResults>({
        documents: [],
        conversations: [],
        members: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const searchTerm = keyword.trim();

        if (!workspaceId || !searchTerm) {
            setResults({
                documents: [],
                conversations: [],
                members: []
            });
            setLoading(false);
            setError("");
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);
                setError("");

                const data = await searchService.search(
                    workspaceId,
                    searchTerm
                );

                setResults(data);
            } catch (error: any) {
                console.error("Search failed:", error);

                setError(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Search failed."
                );

                setResults({
                    documents: [],
                    conversations: [],
                    members: []
                });
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => {
            clearTimeout(timeout);
        };
    }, [workspaceId, keyword]);

    return {
        results,
        loading,
        error
    };
}