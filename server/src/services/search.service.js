import pineconeRetriever from "../ai/retrievers/pinecone.retrievers.js";
import documentRepository from "../repositories/document.repository.js";

class SearchService {

    async search(workspaceId, query) {

        const matches =
            await pineconeRetriever.retrieve(
                workspaceId,
                query
            );

        const results = await Promise.all(

            matches.map(async (match) => {

                const document =
                    await documentRepository.findById(
                        match.metadata.documentId
                    );

                return {

                    documentId: match.metadata.documentId,

                    documentName: document.original_name,

                    chunkIndex: match.metadata.chunkIndex,

                    score: match.score,

                    text: match.metadata.text

                };

            })

        );

        return results;

    }

}

export default new SearchService();