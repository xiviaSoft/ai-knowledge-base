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

                text =
                    await pdfService.extractText(
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



            const vectors =
                await geminiEmbedder.embedMany(
                    chunks
                );


            console.log(
                "Embeddings:",
                vectors.length
            );


            if (!vectors.length) {

                throw new Error(
                    "No embeddings were generated."
                );

            }


    
            await pineconeVectorStore.upsert({

                document,

                vectors

            });


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