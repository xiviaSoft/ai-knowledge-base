"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box } from "@mui/material";
import DocumentsHeader from "@/app/components/document/DocumentsHeader";
import UploadDocumentDialog from "@/app/components/document/UploadDocumentDialog";
import EmptyDocuments from "@/app/components/document/EmptyDocuments";
import documentService from "@/app/services/document.service";
import DocumentTable from "@/app/components/document/DocumentTable";
export default function DocumentsPage() {
    const { workspaceId } = useParams();
    const [uploadOpen, setUploadOpen] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const loadDocuments = useCallback(async () => {
        if (!workspaceId) return;
        try {
            setLoading(true);
            const response = await documentService.getAll(
                workspaceId as string
            );
            setDocuments(response.documents || []);
        } catch (error) {
            console.error("Failed to load documents:", error);
        } finally {
            setLoading(false);
        }
    }, [workspaceId]);
    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);
    useEffect(() => {
        if (!documents.length) return;
        const processing = documents.some(
            (document) =>
                document.status === "UPLOADING" ||
                document.status === "PROCESSING"
        );
        if (!processing) return;
        const interval = setInterval(() => {
            loadDocuments();
        }, 3000);
        return () => clearInterval(interval);
    }, [documents, loadDocuments]);
    async function handleDelete(document: any) {
        if (!confirm(`Delete "${document.original_name}"?`)) {
            return;
        }
        try {
            await documentService.delete(document.id);
            await loadDocuments();
        } catch (error) {
            console.error("Failed to delete document:", error);
        }
    }
    return (
        <Box sx={{p:2}}>
            <DocumentsHeader
                onUpload={() => setUploadOpen(true)}
            />
            {documents.length === 0 && !loading ? (
                <EmptyDocuments />
            ) : (
                <DocumentTable
                    documents={documents}
                    onDelete={handleDelete}
                />
            )}
            <UploadDocumentDialog
                open={uploadOpen}
                onClose={() => setUploadOpen(false)}
                workspaceId={workspaceId as string}
                onUploaded={loadDocuments}
            />
        </Box>
    );
}