import { Pinecone } from "@pinecone-database/pinecone";
import readlineSync from "readline-sync";
import * as dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const EMBEDDING_MODEL = "gemini-embedding-001";
const GENERATION_MODEL = "gemini-3.1-flash-lite";
const OUTPUT_DIMENSIONALITY = 768;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

async function embedText(text, taskType = "RETRIEVAL_QUERY") {
    console.log(" Creating embedding...");

    try {
        const response = await ai.models.embedContent({
            model: EMBEDDING_MODEL,
            contents: text,
            config: {
                taskType,
                outputDimensionality: OUTPUT_DIMENSIONALITY,
            },
        });


        return response.embeddings[0].values;
    } catch (err) {
        console.error("Embedding Error:");
        console.error(err);
        throw err;
    }
}

async function question(questionText) {
    try {
        const queryEmbedding = await embedText(
            questionText,
            "RETRIEVAL_QUERY"
        );

        console.log("Checking Pinecone index...");

        const stats = await pineconeIndex.describeIndexStats();

        console.log("Index Stats:");
        console.log(stats);

        console.log("Querying Pinecone...");

        const searchResults = await pineconeIndex.query({
            vector: queryEmbedding,
            topK: 5,
            includeMetadata: true,
        });

        console.log("Pinecone query completed.");

        console.log("Matches found:", searchResults.matches.length);

        if (!searchResults.matches.length) {
            console.log("No matching vectors found.");
            return;
        }

        const context = searchResults.matches
            .map(match => match.metadata?.text || "")
            .join("\n\n---\n\n");

        console.log("\n\n");
        console.log(context);

        const prompt = `
You are a helpful assistant.

Use ONLY the provided context.

If the answer is not present in the context, reply:

"I don't know."

Context:
${context}

Question:
${questionText}
`;

        console.log("\n Generating answer...");

        const response = await ai.models.generateContent({
            model: GENERATION_MODEL,
            contents: prompt,
        });

        console.log("\n\n");
        console.log(response.text);

    } catch (err) {
        console.error("\n ERROR:");
        console.error(err);
    }
}

async function main() {
    const userProblem =
        process.argv[2] ||
        readlineSync.question("What is your problem? ");

    await question(userProblem);
}

main();
