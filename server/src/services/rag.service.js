import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const EMBEDDING_MODEL = "gemini-embedding-001";
const GENERATION_MODEL = "gemini-flash-lite-latest";
const OUTPUT_DIMENSIONALITY = 768;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}



function buildFallbackAnswer(questionText, context) {
  

    const questionWords = new Set(normalizeText(questionText).split(" ").filter(Boolean));
    const chunks = context
        .split("\n\n")
        .map((chunk) => chunk.trim())
        .filter(Boolean);

    if (!chunks.length) {
        return "I don't know";
    }

    let bestChunk = chunks[0];
    let bestScore = -Infinity;

    for (const chunk of chunks) {
        const normalizedChunk = normalizeText(chunk);
        const chunkWords = normalizedChunk.split(" ").filter(Boolean);
        const overlap = chunkWords.filter((word) => questionWords.has(word)).length;
        const exactMatchBonus = normalizedChunk.includes(normalizeText(questionText)) ? 5 : 0;
        const score = overlap * 3 + exactMatchBonus;

        if (score > bestScore) {
            bestScore = score;
            bestChunk = chunk;
        }
    }

    return bestChunk;
}

async function embedText(text, taskType = "RETRIEVAL_QUERY") {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: {
                    parts: [{ text }],
                },
                taskType,
                outputDimensionality: OUTPUT_DIMENSIONALITY,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error?.message || "Embedding request failed");
    }

    return data.embedding.values;
}

async function findRelevantContext(questionText) {
    const queryEmbedding = await embedText(questionText, "RETRIEVAL_QUERY");

    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    const searchResults = await pineconeIndex.query({
        vector: queryEmbedding,
        topK: 5,
        includeMetadata: true,
    });

    return searchResults.matches.map((match) => match.metadata.text).join("\n\n");
}

export async function answerQuestion(questionText) {
    const staticAnswer = getStaticKnowledgeAnswer(questionText);
    if (staticAnswer) {
        return staticAnswer;
    }

    const context = await findRelevantContext(questionText);
    const prompt = `You are a helpful assistant. Use the following context to answer the question. If the context does not contain the answer, say "I don't know".\n\nContext:\n${context}\n\nQuestion:\n${questionText}`;

    try {
        const response = await ai.models.generateContent({
            model: GENERATION_MODEL,
            contents: prompt,
        });

        return response.text || "I don't know";
    } catch (error) {
        const errorMessage = error?.message || "";

        if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("429")) {
            return buildFallbackAnswer(questionText, context);
        }

        return buildFallbackAnswer(questionText, context);
    }
}
