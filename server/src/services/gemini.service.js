import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export default ai;

/**
 * Generate final answer from context
 */
export async function generateAnswer(question, context) {

    const prompt = `
You are an intelligent AI assistant.

Answer ONLY using the provided context.

Rules:

- Do not make up information.
- Keep the answer clear.
- Use headings if needed.
- If context is insufficient say:
"I couldn't find enough information."

Context:

${context}

Question:

${question}
`;

    const response = await ai.models.generateContent({
        model:"gemini-3.1-flash-lite",
        contents: prompt,
    });

    return response.text;
}