import { Pinecone } from "@pinecone-database/pinecone";
import geminiEmbedder from "../embedders/gemini.embedder.js";


class PineconeRetriever {

    constructor() {

        this.pinecone = new Pinecone({

            apiKey: process.env.PINECONE_API_KEY

        });

        this.indexName =
            process.env.PINECONE_INDEX;

    }


    async retrieve(
        workspaceId,
        question,
        topK = 5
    ) {

        if (!workspaceId) {

            throw new Error(
                "Workspace ID is required for retrieval."
            );

        }

        if (!question?.trim()) {

            throw new Error(
                "Question is required for retrieval."
            );

        }


        /*
        | Generate query embedding
        */

        const embedding =
            await geminiEmbedder.embed(
                question
            );


        console.log(
            "Query embedding dimension:",
            embedding.length
        );


        /*
        | Connect to Pinecone index
        */

        const index =
            this.pinecone.index(
                this.indexName
            );


        /*
        | Query workspace namespace
        */

        const namespace =
            index.namespace(
                workspaceId
            );


        const result =
            await namespace.query({

                vector: embedding,

                topK,

                includeMetadata: true,

                includeValues: false

            });


        console.log(
            "Pinecone query result:",
            result
        );


        /*
        | Return matches
        */

        return result.matches || [];

    }

}


export default new PineconeRetriever();