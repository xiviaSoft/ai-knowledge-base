import ai from "../../services/gemini.service.js";

class GeminiEmbedder {

    async embed(text) {

        const response = await ai.models.embedContent({
            model: "gemini-embedding-001",
            contents: text,
            config: {
                outputDimensionality: 1024
            }
        });

        return response.embeddings[0].values;
    }

    async embedMany(chunks) {

        const vectors = [];

        for (const chunk of chunks) {

            const embedding = await this.embed(chunk.pageContent);

            vectors.push({
                pageContent: chunk.pageContent,
                embedding
            });

        }

        return vectors;
    }
}

export default new GeminiEmbedder();