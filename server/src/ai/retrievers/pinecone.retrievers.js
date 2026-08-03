import index from "../../config/pinecone.js";
import geminiEmbedder from "../embedders/gemini.embedder.js";

class PineconeRetriever {

    async retrieve(workspaceId, question, topK = 5) {

        const embedding = await geminiEmbedder.embed(question);

        const response = await index
            .namespace(workspaceId)
            .query({
                vector: embedding,
                topK,
                includeMetadata: true
            });
        console.log(JSON.stringify(response, null, 2));
        console.log("Retrieved Matches:", response.matches);
        return (response.matches || []).map(match => ({
            score: match.score,
            metadata: match.metadata
        }));

    }

}

export default new PineconeRetriever();