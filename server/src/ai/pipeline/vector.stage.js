import pineconeVectorStore
from "../vectorstores/pinecone.vectorstore.js";

class VectorStage {

    async execute(context) {

        await pineconeVectorStore.upsert(context);

    }

}

export default new VectorStage();