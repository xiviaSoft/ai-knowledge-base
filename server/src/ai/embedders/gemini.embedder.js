import ai from "../../services/gemini.service.js";

class GeminiEmbedder {

    async embedMany(chunks) {

        const vectors = [];

        for (const chunk of chunks) {

            const embedding =
                await this.embed(chunk.pageContent);

            vectors.push({

                ...chunk,

                embedding

            });

        }

        return vectors;

    }

}

export default new GeminiEmbedder();