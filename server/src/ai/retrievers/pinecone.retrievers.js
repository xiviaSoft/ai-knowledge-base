import geminiEmbedder from "../embedders/gemini.embedder.js";
import index from "../../config/pinecone.js";
class PineconeRetriever {
    async retrieve(workspaceId, question, topK = 5) {
        if (!workspaceId) {
            throw new Error("Workspace ID is required for retrieval.");
        }
        if (!question?.trim()) {
            throw new Error("Question is required for retrieval.");
        }
        const namespace = String(workspaceId);
        const embedding = await geminiEmbedder.embed(question.trim());
        if (!Array.isArray(embedding) || embedding.length === 0) {
            throw new Error("Query embedding is empty or invalid.");
        }
        if (embedding.length !== 1024) {
            throw new Error(`Query embedding dimension mismatch. Expected 1024, received ${embedding.length}.`);
        }
        console.log("========== PINECONE RETRIEVAL ==========");
        const stats = await index.describeIndexStats();
        console.log("Pinecone index stats:", JSON.stringify(stats, null, 2));
        const namespaceStats = stats?.namespaces?.[namespace];
        console.log("Namespace stats:", namespaceStats);
        const namespaceIndex = index.namespace(namespace);
        const result = await namespaceIndex.query({
            vector: embedding,
            topK: Number(topK),
            includeMetadata: true,
            includeValues: false
        });
        const matches = result?.matches || [];
        console.log("Matches found:", matches.length);
        console.log("Matches:", JSON.stringify(matches, null, 2));
        return matches;
    }
}
export default new PineconeRetriever();