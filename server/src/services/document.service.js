import pineconeVectorStore from "../ai/vectorstores/pinecone.vectorstore.js";
import documentRepository from "../repositories/document.repository.js";
import chunkRepository from "../repositories/chunk.repository.js";
import { serializeBigInt } from "../utils/slug.js";
import ragProcessor from "../ai/rag.processor.js";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";

class DocumentService {
    async uploadDocument(userId, workspaceId, file) {
        if (!userId) {
            throw new Error("User ID is required.");
        }
        if (!workspaceId) {
            throw new Error("Workspace ID is required.");
        }
        if (!file) {
            throw new Error("File is required.");
        }
        const extension = file.originalname.split(".").pop().toUpperCase();
        const document = await documentRepository.create({
            id: uuid(),
            workspace_id: workspaceId,
            uploaded_by: userId,
            original_name: file.originalname,
            stored_name: file.filename,
            file_type: extension,
            file_size: BigInt(file.size),
            storage_path: file.path,
            status: "UPLOADING"
        });
        try {
            await documentRepository.updateStatus(
                document.id,
                "PROCESSING"
            );
            await ragProcessor.process(document);
            const readyDocument = await documentRepository.updateStatus(
                document.id,
                "READY"
            );
            return {
                message: "Document uploaded successfully.",
                document: serializeBigInt(readyDocument)
            };
        } catch (error) {
            console.error("Document processing failed:", error);
            try {
                await documentRepository.updateStatus(
                    document.id,
                    "FAILED"
                );
            } catch (statusError) {
                console.error(
                    "Failed to update document status:",
                    statusError
                );
            }
            throw error;
        }
    }

    async getDocuments(workspaceId) {
        if (!workspaceId) {
            throw new Error("Workspace ID is required.");
        }
        const documents = await documentRepository.findAllByWorkspace(
            workspaceId
        );
        return serializeBigInt(documents);
    }

    async getDocumentsByWorkspace(workspaceId) {
        if (!workspaceId) {
            throw new Error("Workspace ID is required.");
        }
        const documents = await documentRepository.findByWorkspace(
            workspaceId
        );
        return serializeBigInt(documents);
    }

   async getDocument(id) {
    const document =
        await documentRepository.findById(id);

    if (!document) {
        throw new Error(
            "Document not found."
        );
    }

    const chunks =
        await chunkRepository.findByDocumentId(
            document.id
        );

    const pineconeVectors =
        await pineconeVectorStore.getDocumentVectors(
            document.workspace_id,
            document.id,
            chunks.length
        );

    return serializeBigInt({
        document,
        chunks,
        pinecone: {
            namespace: String(
                document.workspace_id
            ),
            vectorCount:
                pineconeVectors.length,
            vectors: pineconeVectors
        }
    });
}
    async deleteDocument(id, userId) {
        const document = await documentRepository.findById(id);
        if (!document) {
            throw new Error("Document not found.");
        }
        if (userId && document.uploaded_by !== userId) {
            throw new Error(
                "You do not have permission to delete this document."
            );
        }
        const chunkCount = await chunkRepository.countByDocumentId(
            document.id
        );
        await pineconeVectorStore.deleteDocumentVectors(
            document.workspace_id,
            document.id,
            chunkCount
        );
        await chunkRepository.deleteByDocumentId(
            document.id
        );
        try {
            await fs.unlink(document.storage_path);
        } catch (error) {
            console.log(
                "File already deleted or not found."
            );
        }
        await documentRepository.delete(
            document.id
        );
        return {
            message: "Document deleted successfully."
        };
    }

    async retryDocument(id, userId) {
        const document = await documentRepository.findById(id);
        if (!document) {
            throw new Error("Document not found.");
        }
        if (userId && document.uploaded_by !== userId) {
            throw new Error("You do not have permission to retry this document.");
        }
        if (document.status !== "FAILED") {
            throw new Error("Only failed documents can be retried.");
        }
        try {
            await documentRepository.updateStatus(
                document.id,
                "PROCESSING"
            );
            await ragProcessor.process(document);
            const readyDocument = await documentRepository.updateStatus(
                document.id,
                "READY"
            );
            return {
                message: "Document processed successfully.",
                document: serializeBigInt(readyDocument)
            };
        } catch (error) {
            console.error("Document retry processing failed:", error);
            try {
                await documentRepository.updateStatus(
                    document.id,
                    "FAILED"
                );
            } catch (statusError) {
                console.error(
                    "Failed to update document status:",
                    statusError
                );
            }
            throw error;
        }
    }

   
}
export default new DocumentService();