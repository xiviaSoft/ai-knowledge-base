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

}

export default new PineconeVectorStore();