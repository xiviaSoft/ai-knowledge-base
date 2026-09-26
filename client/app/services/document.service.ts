import api from "./api.service";

export interface DocumentChunk {
    id: string;
    document_id: string;
    chunk_index: number;
    content: string;
    created_at?: string;
}

export interface PineconeVector {
    id: string;
    metadata: {
        workspaceId?: string;
        documentId?: string;
        chunkIndex?: number;
        text?: string;
        [key: string]: unknown;
    };
}

export interface Document {
    id: string;
    workspace_id: string;
    uploaded_by: string;
    original_name: string;
    stored_name: string;
    file_type: string;
    file_size: string | number;
    storage_path: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}

export interface DocumentDetails {
    document: Document;
    chunks: DocumentChunk[];
    pinecone: {
        namespace: string;
        vectorCount: number;
        vectors: PineconeVector[];
    };
}

class DocumentService {
    async getAll(workspaceId: string) {
        const { data } = await api.get(
            `/documents/workspace/${workspaceId}`
        );

        return data;
    }

    async getById(
        documentId: string
    ): Promise<DocumentDetails> {
        const { data } = await api.get(
            `/documents/${documentId}`
        );

        return data.data;
    }

    async upload(
        formData: FormData,
        onProgress?: (
            progress: number
        ) => void
    ) {
        const { data } = await api.post(
            "/documents/upload",
            formData,
            {
                onUploadProgress: (event) => {
                    if (!event.total) {
                        return;
                    }

                    const progress =
                        Math.round(
                            (event.loaded * 100) /
                                event.total
                        );

                    onProgress?.(progress);
                }
            }
        );

        return data;
    }

    async update(
        documentId: string,
        payload: {
            original_name?: string;
        }
    ) {
        const { data } = await api.patch(
            `/documents/${documentId}`,
            payload
        );

        return data;
    }

    async delete(
        documentId: string
    ) {
        const { data } = await api.delete(
            `/documents/${documentId}`
        );

        return data;
    }

    async retry(
        documentId: string
    ) {
        const { data } = await api.post(
            `/documents/${documentId}/retry`
        );

        return data;
    }
}

export default new DocumentService();