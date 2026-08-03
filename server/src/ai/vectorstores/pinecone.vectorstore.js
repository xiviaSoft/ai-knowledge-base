import index from "../../config/pinecone.js";

class PineconeVectorStore {

    async upsert(context) {

        const vectors = context.vectors.map((vector, indexNumber) => ({

            id: `${context.document.id}_${indexNumber}`,

            values: vector.embedding,

            metadata: {

                workspaceId: context.document.workspace_id,

                documentId: context.document.id,

                chunkIndex: indexNumber,

                text: vector.pageContent

            }

        }));
        await index.namespace(context.document.workspace_id).upsert(vectors);
    }
    
    async deleteDocumentVectors(workspaceId, documentId, chunkCount) {

        const ids = [];

        for (let i = 0; i < chunkCount; i++) {
            ids.push(`${documentId}_${i}`);
        }

        console.log("Deleting IDs:", ids);

        if (ids.length === 0) {
            console.log("No vectors to delete.");
            return;
        }

        await index
            .namespace(workspaceId)
            .deleteMany(ids);

        console.log("Vectors deleted successfully.");
    }

}

export default new PineconeVectorStore();