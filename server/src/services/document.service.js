import pineconeVectorStore
    from "../ai/vectorstores/pinecone.vectorstore.js";

import documentRepository
    from "../repositories/document.repository.js";

import chunkRepository
    from "../repositories/chunk.repository.js";

import { serializeBigInt }
    from "../utils/slug.js";

import ragProcessor
    from "../ai/rag.processor.js";

import { v4 as uuid }
    from "uuid";

import fs
    from "fs/promises";


class DocumentService {


    /*
    |--------------------------------------------------------------------------
    | Upload document
    |--------------------------------------------------------------------------
    */

    async uploadDocument(
        userId,
        workspaceId,
        file
    ) {

        if (!userId) {

            throw new Error(
                "User ID is required."
            );

        }

        if (!workspaceId) {

            throw new Error(
                "Workspace ID is required."
            );

        }

        if (!file) {

            throw new Error(
                "File is required."
            );

        }


        const extension =
            file.originalname
                .split(".")
                .pop()
                .toUpperCase();


        const document =
            await documentRepository.create({

                id:
                    uuid(),

                workspace_id:
                    workspaceId,

                uploaded_by:
                    userId,

                original_name:
                    file.originalname,

                stored_name:
                    file.filename,

                file_type:
                    extension,

                file_size:
                    BigInt(file.size),

                storage_path:
                    file.path,

                status:
                    "UPLOADING"

            });


        try {

            /*
            |--------------------------------------------------------------------------
            | Process document
            |--------------------------------------------------------------------------
            */

            await documentRepository.updateStatus(
                document.id,
                "PROCESSING"
            );


            await ragProcessor.process(
                document
            );


            /*
            |--------------------------------------------------------------------------
            | Mark document ready
            |--------------------------------------------------------------------------
            */

            const readyDocument =
                await documentRepository.updateStatus(

                    document.id,

                    "READY"

                );


            return {

                message:
                    "Document uploaded successfully.",

                document:
                    serializeBigInt(
                        readyDocument
                    )

            };

        }

        catch (error) {

            console.error(
                "Document processing failed:",
                error
            );


            /*
            |--------------------------------------------------------------------------
            | Mark document as failed
            |--------------------------------------------------------------------------
            */

            try {

                await documentRepository.updateStatus(

                    document.id,

                    "FAILED"

                );

            }

            catch (statusError) {

                console.error(
                    "Failed to update document status:",
                    statusError
                );

            }


            throw error;

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Get documents
    |--------------------------------------------------------------------------
    */

    async getDocuments(
        workspaceId
    ) {

        if (!workspaceId) {

            throw new Error(
                "Workspace ID is required."
            );

        }


        const documents =
            await documentRepository
                .findAllByWorkspace(
                    workspaceId
                );


        return serializeBigInt(
            documents
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Get documents by workspace
    |--------------------------------------------------------------------------
    */

    async getDocumentsByWorkspace(
        workspaceId
    ) {

        if (!workspaceId) {

            throw new Error(
                "Workspace ID is required."
            );

        }


        const documents =
            await documentRepository
                .findByWorkspace(
                    workspaceId
                );


        return serializeBigInt(
            documents
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Get single document
    |--------------------------------------------------------------------------
    */

    async getDocument(
        id
    ) {

        const document =
            await documentRepository.findById(
                id
            );


        if (!document) {

            throw new Error(
                "Document not found."
            );

        }


        return document;

    }


    async deleteDocument(
        id,
        userId
    ) {

        const document =
            await documentRepository.findById(
                id
            );


        if (!document) {

            throw new Error(
                "Document not found."
            );

        }


        if (
            document.uploaded_by !== userId
        ) {

            throw new Error(
                "You do not have permission to delete this document."
            );

        }


        const chunkCount =
            await chunkRepository.countByDocumentId(
                document.id
            );


        /*
        |--------------------------------------------------------------------------
        | Delete Pinecone vectors
        |--------------------------------------------------------------------------
        */

        await pineconeVectorStore
            .deleteDocumentVectors(

                document.workspace_id,

                document.id,

                chunkCount

            );


        /*
        |--------------------------------------------------------------------------
        | Delete database chunks
        |--------------------------------------------------------------------------
        */

        await chunkRepository
            .deleteByDocumentId(
                document.id
            );


        /*
        |--------------------------------------------------------------------------
        | Delete physical file
        |--------------------------------------------------------------------------
        */

        try {

            await fs.unlink(
                document.storage_path
            );

        }

        catch (error) {

            console.log(
                "File already deleted or not found."
            );

        }


        /*
        |--------------------------------------------------------------------------
        | Delete document record
        |--------------------------------------------------------------------------
        */

        await documentRepository.delete(
            document.id
        );


        return {

            message:
                "Document deleted successfully."

        };

    }

}


export default new DocumentService();