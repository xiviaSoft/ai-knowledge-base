import ai from "../../services/gemini.service.js";

class GeminiGenerator {

    async generate(prompt) {

        const response = await ai.models.generateContent({

            model: "gemini-3.1-flash-lite",

            contents: prompt

        });

        const text = response.text;

        if (!text) {

            throw new Error(
                "Gemini returned an empty response."
            );

        }

        return text;

    }

}

export default new GeminiGenerator();