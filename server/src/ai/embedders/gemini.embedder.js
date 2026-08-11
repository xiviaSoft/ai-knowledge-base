import ai from "../../services/gemini.service.js";

class GeminiEmbedder {

    async embed(text) {

        if (!text || !text.trim()) {
            throw new Error("Cannot create embedding for empty text.");
        }

        const response = await ai.models.embedContent({

            model: "gemini-embedding-001",

            contents: text,

            config: {
                outputDimensionality: 1024
            }

        });

        const values = response?.embeddings?.[0]?.values;

        if (!values || values.length === 0) {

            throw new Error(
                "Gemini returned an empty embedding."
            );

        }

        console.log(
            "Embedding dimension:",
            values.length
        );

        return values;

    }

    async embedMany(chunks) {

        const vectors = [];

        for (const chunk of chunks) {

            const embedding =
                await this.embed(chunk.pageContent);

            vectors.push({

                pageContent:
                    chunk.pageContent,

                embedding

            });

        }

        return vectors;

    }

}

export default new GeminiEmbedder();