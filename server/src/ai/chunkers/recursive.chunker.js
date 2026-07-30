import { RecursiveCharacterTextSplitter }
from "@langchain/textsplitters";

class RecursiveChunker {

    async chunk(text) {

        const splitter =
            new RecursiveCharacterTextSplitter({

                chunkSize: 1000,
                chunkOverlap: 200

            });

        return splitter.createDocuments([text]);

    }

}

export default new RecursiveChunker();