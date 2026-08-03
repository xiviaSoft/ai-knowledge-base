import chunkRepository from "../repositories/chunk.repository.js";
import chunkService from "./chunk.service.js";
import pdfService from "./pdf.service.js";
import geminiEmbedder from "./embedders/gemini.embedder.js";
import pineconeVectorStore from "./vectorstores/pinecone.vectorstore.js";
import { v4 as uuid } from "uuid";

class RagProcessor {

    async process(document) {

        let text = "";

        if (document.file_type === "PDF") {

            text = await pdfService.extractText(
                document.storage_path
            );

        }

        const chunks = await chunkService.split(text);

        console.log("Chunks:", chunks.length);

        await chunkRepository.createMany(

            chunks.map((chunk, index) => ({

                id: uuid(),

                document_id: document.id,

                chunk_index: index,

                content: chunk.pageContent

            }))

        );

        // Generate embeddings
        const vectors = await geminiEmbedder.embedMany(chunks);

        console.log("Embeddings:", vectors.length);

        // Upload to Pinecone
        await pineconeVectorStore.upsert({

            document,

            vectors

        });

        console.log("RAG Processing Completed");

    }

}

export default new RagProcessor();