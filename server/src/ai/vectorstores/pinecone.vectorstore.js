import index from "../../config/pinecone.js";

class PineconeVectorStore {

    async upsert({ document, vectors }) {

        if (!document?.workspace_id) {

            throw new Error(
                "Document workspace_id is required for Pinecone indexing."
            );

        }

        if (!document?.id) {

            throw new Error(
                "Document id is required for Pinecone indexing."
            );

        }

        if (!vectors?.length) {

            throw new Error(
                "No vectors provided for Pinecone indexing."
            );

        }


        const namespace =
            index.namespace(
                document.workspace_id
            );


        const pineconeVectors =
            vectors.map((vector, indexNumber) => ({

                id: `${document.id}_${indexNumber}`,

                values: vector.embedding,

                metadata: {

                    workspaceId:
                        document.workspace_id,

                    documentId:
                        document.id,

                    chunkIndex:
                        indexNumber,

                    text:
                        vector.pageContent

                }

            }));


        console.log(
            "Pinecone indexing:",
            {

                workspaceId:
                    document.workspace_id,

                documentId:
                    document.id,

                namespace:
                    document.workspace_id,

                vectorCount:
                    pineconeVectors.length

            }
        );


        await namespace.upsert(
            pineconeVectors
        );


        console.log(
            `Successfully indexed ${pineconeVectors.length} vectors.`
        );


        return {

            workspaceId:
                document.workspace_id,

            documentId:
                document.id,

            vectorCount:
                pineconeVectors.length

        };

    }


    async deleteDocumentVectors(
        workspaceId,
        documentId,
        chunkCount
    ) {

        if (!workspaceId) {

            throw new Error(
                "Workspace ID is required."
            );

        }

        if (!documentId) {

            throw new Error(
                "Document ID is required."
            );

        }

        if (!chunkCount || chunkCount <= 0) {

            console.log(
                "No vectors to delete."
            );

            return;

        }


        const ids = Array.from(
            { length: Number(chunkCount) },
            (_, indexNumber) =>
                `${documentId}_${indexNumber}`
        );


        console.log(
            "Deleting Pinecone vectors:",
            {

                workspaceId,

                documentId,

                count: ids.length

            }
        );


        await index
            .namespace(workspaceId)
            .deleteMany(ids);


        console.log(
            "Vectors deleted successfully."
        );

    }

}

export default new PineconeVectorStore();