import chunkRepository from "../repositories/chunk.repository.js";
import chunkService from "./chunk.service.js";
import pdfService from "./pdf.service.js";
import geminiEmbedder from "./embedders/gemini.embedder.js";
import pineconeVectorStore from "./vectorstores/pinecone.vectorstore.js";
import documentRepository from "../repositories/document.repository.js";
import { v4 as uuid } from "uuid";

class RagProcessor {

    async process(document) {

        try {

            await documentRepository.updateStatus(
                document.id,
                "PROCESSING"
            );

            let text = "";

            if (document.file_type === "PDF") {

                text = await pdfService.extractText(
                    document.storage_path
                );

            } else {

                throw new Error(
                    `Unsupported file type: ${document.file_type}`
                );

            }


            if (!text?.trim()) {

                throw new Error(
                    "No text could be extracted from the document."
                );

            }


            console.log(
                "Extracted text length:",
                text.length
            );


            const chunks =
                await chunkService.split(text);


            console.log(
                "Chunks:",
                chunks.length
            );


            if (!chunks.length) {

                throw new Error(
                    "Document produced no chunks."
                );

            }


            // ==========================================
            // 3. SAVE CHUNKS TO MYSQL
            // ==========================================

            await chunkRepository.createMany(

                chunks.map(
                    (chunk, index) => ({

                        id: uuid(),

                        document_id:
                            document.id,

                        chunk_index:
                            index,

                        content:
                            chunk.pageContent

                    })
                )

            );


            console.log(
                "Chunks saved:",
                chunks.length
            );


            // ==========================================
            // 4. GENERATE EMBEDDINGS
            // ==========================================

            const embeddings =
                await geminiEmbedder.embedMany(
                    chunks
                );


            console.log(
                "========== EMBEDDING RESULT =========="
            );

            console.log(
                "Type:",
                typeof embeddings
            );

            console.log(
                "Is array:",
                Array.isArray(embeddings)
            );

            console.log(
                "Count:",
                embeddings?.length
            );

            console.log(
                "First result:",
                embeddings?.[0]
            );

            console.log(
                "First result type:",
                typeof embeddings?.[0]
            );

            console.log(
                "First result is array:",
                Array.isArray(embeddings?.[0])
            );

            console.log(
                "First embedding dimension:",
                embeddings?.[0]?.embedding?.length
            );

            console.log(
                "======================================"
            );


            // ==========================================
            // VALIDATE EMBEDDINGS
            // ==========================================

            if (!Array.isArray(embeddings)) {

                throw new Error(
                    "Embedding result must be an array."
                );

            }


            if (embeddings.length === 0) {

                throw new Error(
                    "No embeddings were generated."
                );

            }


            if (embeddings.length !== chunks.length) {

                throw new Error(
                    `Embedding/chunk count mismatch: ${embeddings.length} embeddings for ${chunks.length} chunks`
                );

            }


            embeddings.forEach(
                (item, index) => {

                    if (
                        !item ||
                        !Array.isArray(item.embedding)
                    ) {

                        throw new Error(
                            `Invalid embedding result at index ${index}. Expected an object containing an embedding array.`
                        );

                    }


                    if (item.embedding.length === 0) {

                        throw new Error(
                            `Embedding at index ${index} is empty.`
                        );

                    }

                }
            );


            console.log(
                "Embedding dimension:",
                embeddings[0].embedding.length
            );

            const workspaceId =
                document.workspace_id;

            const documentId =
                document.id;


            console.log(
                "========== PINECONE INDEXING =========="
            );

            console.log({

                workspaceId,

                documentId,

                chunks:
                    chunks.length,

                embeddings:
                    embeddings.length,

                dimension:
                    embeddings[0].embedding.length

            });


            await pineconeVectorStore.upsert(

                embeddings,

                chunks,

                workspaceId,

                documentId

            );


            console.log(
                "Vectors uploaded to Pinecone."
            );

            await documentRepository.updateStatus(
                document.id,
                "READY"
            );


            console.log(
                "RAG Processing Completed:",
                document.id
            );


            return true;

        }
        catch (error) {

            console.error(
                "RAG Processing Failed:",
                error
            );


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

}

export default new RagProcessor();