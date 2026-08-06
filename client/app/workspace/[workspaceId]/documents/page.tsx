"use client";

import { useEffect, useState } from "react";
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

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (workspaceId) {

            loadDocuments();

        }

    }, [workspaceId]);

    async function loadDocuments() {

        try {

            setLoading(true);

            const response = await documentService.getAll(
                workspaceId as string
            );

            setDocuments(response.documents || []);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }
    async function handleDelete(document: any) {

        if (

            !confirm(

                `Delete "${document.original_name}"?`

            )

        ) {

            return;

        }

        try {

            await documentService.delete(document.id);

            loadDocuments();

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <Box>

            <DocumentsHeader

                onUpload={() => setUploadOpen(true)}

            />

            {

                documents.length === 0 ? (

                    <EmptyDocuments />

                ) : (
                    <DocumentTable

                        documents={documents}

                        onDelete={handleDelete}

                    />

                )

            }

            <UploadDocumentDialog

                open={uploadOpen}

                onClose={() => setUploadOpen(false)}

                workspaceId={workspaceId}

                onUploaded={loadDocuments}

            />

        </Box>

    );

}