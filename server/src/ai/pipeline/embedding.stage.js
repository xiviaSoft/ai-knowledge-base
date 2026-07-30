import geminiEmbedder
from "../embedders/gemini.embedder.js";

class EmbeddingStage {

    async execute(context) {

        context.vectors =
            await geminiEmbedder.embedMany(
                context.chunks
            );

    }

}

export default new EmbeddingStage();