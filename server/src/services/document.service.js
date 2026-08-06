import pineconeVectorStore from "../ai/vectorstores/pinecone.vectorstore.js";
import documentRepository from "../repositories/document.repository.js";
import chunkRepository from "../repositories/chunk.repository.js";
import { serializeBigInt } from "../utils/slug.js";
import ragProcessor from "../ai/rag.processor.js";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
class DocumentService {

    async uploadDocument(userId, workspaceId, file) {

        const extension =
            file.originalname.split(".").pop().toUpperCase();

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
        await ragProcessor.process(document);
        return {
            message: "Document uploaded successfully.",
            document: serializeBigInt(document)
        };

    }

    async getDocuments(workspaceId) {

        const documents = await documentRepository.findAllByWorkspace(workspaceId);

        return serializeBigInt(documents);

    }

   async getDocumentsByWorkspace(workspaceId) {

    return documentRepository.findByWorkspace(

        workspaceId

    );

}

    async deleteDocument(id) {
        return await documentRepository.delete(id);

    }

    async deleteDocument(id) {

        // Find the document first
        const document = await documentRepository.findById(id);

        const chunkCount = await chunkRepository.countByDocumentId(document.id);

        await pineconeVectorStore.deleteDocumentVectors(
            document.workspace_id,
            document.id,
            chunkCount
        );
        if (!document) {
            throw new Error("Document not found.");
        }


        // Delete chunks from database
        await chunkRepository.deleteByDocumentId(document.id);

        // Delete uploaded file
        try {
            await fs.unlink(document.storage_path);
        } catch (error) {
            console.log("File already deleted or not found.");
        }

        // Delete document record
        await documentRepository.delete(document.id);

        return {
            message: "Document deleted successfully."
        };

    }

}

export default new DocumentService();