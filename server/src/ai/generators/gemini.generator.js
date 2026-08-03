import ai from "../../services/gemini.service.js";

class GeminiGenerator {

    async generate(prompt) {

        const response = await ai.models.generateContentStream({

            model: "gemini-3.1-flash-lite",

            contents: prompt

        });

        return response.text;

    }

}

export default new GeminiGenerator();