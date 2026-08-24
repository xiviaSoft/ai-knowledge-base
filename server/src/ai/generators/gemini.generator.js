import ai from "../../services/gemini.service.js";
class GeminiGenerator {
    async generateStream(prompt, onToken) {
        const response = await ai.models.generateContentStream({
            model: "gemini-3.1-flash-lite",
            contents: prompt
        });
        let fullResponse = "";
        for await (const chunk of response) {
            const text = chunk.text;
            if (text) {
                fullResponse += text;
                if (typeof onToken === "function") {
                    onToken(text);
                }
            }
        }
        if (!fullResponse.trim()) {
            throw new Error("Gemini returned an empty response.");
        }
        return fullResponse;
    }
}
export default new GeminiGenerator();