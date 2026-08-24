import index from "../../config/pinecone.js";
class PineconeVectorStore {
    async upsert(embeddings, chunks, workspaceId, documentId) {
        if (!Array.isArray(embeddings)) {
            throw new Error("Embeddings must be an array.");
        }
        if (embeddings.length === 0) {
            throw new Error("No embeddings provided.");
        }
        if (!Array.isArray(chunks)) {
            throw new Error("Chunks must be an array.");
        }
        if (chunks.length === 0) {
            throw new Error("No chunks provided.");
        }
        if (embeddings.length !== chunks.length) {
            throw new Error(`Embedding/chunk mismatch: ${embeddings.length} embeddings vs ${chunks.length} chunks`);
        }
        if (!workspaceId) {
            throw new Error("Workspace ID is required.");
        }
        if (!documentId) {
            throw new Error("Document ID is required.");
        }
        const namespace = String(workspaceId);
        const records = embeddings.map((item, indexNumber) => {
            const embedding = Array.isArray(item) ? item : item?.embedding || item?.values;
            if (!Array.isArray(embedding)) {
                throw new Error(`Embedding ${indexNumber} is not an array. Received: ${typeof embedding}`);
            }
            if (embedding.length === 0) {
                throw new Error(`Embedding ${indexNumber} is empty.`);
            }
            const values = embedding.map(Number);
            if (values.some(value => !Number.isFinite(value))) {
                throw new Error(`Embedding ${indexNumber} contains invalid numeric values.`);
            }
            const chunk = chunks[indexNumber];
            if (!chunk) {
                throw new Error(`Chunk ${indexNumber} does not exist.`);
            }
            const text = String(chunk.pageContent || chunk.content || item?.pageContent || "");
            if (!text.trim()) {
                throw new Error(`Chunk ${indexNumber} has no text content.`);
            }
            return {
                id: `${documentId}-${indexNumber}`,
                values,
                metadata: {
                    workspaceId: namespace,
                    documentId: String(documentId),
                    chunkIndex: indexNumber,
                    text
                }
            };
        });
        if (records.length === 0) {
            throw new Error("No Pinecone records were created.");
        }
        const vectorDimension = records[0].values.length;
        if (vectorDimension === 0) {
            throw new Error("Pinecone vector dimension cannot be zero.");
        }
        for (const record of records) {
            if (record.values.length !== vectorDimension) {
                throw new Error(`Vector dimension mismatch at ${record.id}: expected ${vectorDimension}, received ${record.values.length}`);
            }
        }
        console.log(`Preparing ${records.length} Pinecone vectors`);
        console.log(`Vector dimension: ${vectorDimension}`);
        console.log(`Namespace: ${namespace}`);
        console.log(`First vector ID: ${records[0].id}`);
        console.log(`Last vector ID: ${records[records.length - 1].id}`);
        const namespaceIndex = index.namespace(namespace);
        await namespaceIndex.upsert(records);
        console.log("Pinecone namespace:", namespace);
        console.log("Uploaded vector IDs:", records.map(record => record.id));
        console.log(`Successfully indexed ${records.length} vectors`);
        return {
            namespace,
            vectorCount: records.length,
            dimension: vectorDimension
        };
    }
    async deleteDocumentVectors(workspaceId, documentId, chunkCount) {
        if (!workspaceId) {
            throw new Error("Workspace ID is required.");
        }
        if (!documentId) {
            throw new Error("Document ID is required.");
        }
        const count = Number(chunkCount);
        if (!Number.isInteger(count) || count <= 0) {
            console.log("No vectors to delete.");
            return;
        }
        const ids = Array.from({ length: count }, (_, indexNumber) => `${documentId}-${indexNumber}`);
        console.log(`Deleting ${ids.length} Pinecone vectors`);
        await index.namespace(String(workspaceId)).deleteMany(ids);
        console.log("Vectors deleted successfully.");
    }
}
export default new PineconeVectorStore();