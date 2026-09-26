"use client";

import {
    useCallback,
    useEffect,
    useState
} from "react";
import documentService, {
    DocumentDetails
} from "@/app/services/document.service";

export default function useDocumentDetails(
    documentId: string
) {
    const [data, setData] =
        useState<DocumentDetails | null>(
            null
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const fetchDocument =
        useCallback(async () => {
            if (!documentId) {
                setData(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response =
                    await documentService.getById(
                        documentId
                    );

                setData(response);
            } catch (error: any) {
                console.error(
                    "Failed to fetch document:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to load document."
                );
            } finally {
                setLoading(false);
            }
        }, [documentId]);

    useEffect(() => {
        fetchDocument();
    }, [fetchDocument]);

    return {
        data,
        document: data?.document || null,
        chunks: data?.chunks || [],
        pinecone: data?.pinecone || null,
        loading,
        error,
        fetchDocument
    };
}