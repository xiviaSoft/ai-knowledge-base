import ai from "./gemini.service.js";

const WIKI_SEARCH_API = "https://en.wikipedia.org/w/api.php";
const WIKI_SUMMARY_API = "https://en.wikipedia.org/api/rest_v1/page/summary";

/**
 * Extract only the topic from the user's question.
 * Example:
 * "What is Node.js?" -> "Node.js"
 */
async function extractTopic(question) {
    const prompt = `
Extract only the main Wikipedia search topic.

Examples:
Question: What is Node.js?
Answer: Node.js

Question: Explain React Hooks
Answer: React Hooks

Question: Tell me about Muhammad Ali Jinnah
Answer: Muhammad Ali Jinnah

Question: What is the Interrupt Flag?
Answer: Interrupt Flag

Only return the topic.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `${prompt}\n\nQuestion: ${question}`,
    });

    return response.text.trim();
}

/**
 * Search Wikipedia
 */
async function searchWikipedia(topic) {

    const url =
        `${WIKI_SEARCH_API}?action=query` +
        `&list=search` +
        `&format=json` +
        `&origin=*` +
        `&utf8=1` +
        `&srlimit=1` +
        `&srsearch=${encodeURIComponent(topic)}`;

    console.log("Wikipedia Search URL:");
    console.log(url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Wikipedia Search API failed (${response.status})`);
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {

        const html = await response.text();

        console.log("Unexpected Response:");
        console.log(html.substring(0, 300));

        throw new Error("Wikipedia returned HTML instead of JSON.");
    }

    const data = await response.json();

    return data.query?.search?.[0]?.title ?? null;
}

/**
 * Fetch Wikipedia Summary
 */
async function fetchSummary(title) {

    const url =
        `${WIKI_SUMMARY_API}/${encodeURIComponent(title)}`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "AI-Knowledge-Assistant/1.0",
            "Accept": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Wikipedia Summary API failed (${response.status})`);
    }

    const article = await response.json();

    return {

        title: article.title,

        description: article.description || "",

        summary: article.extract || "",

        image: article.thumbnail?.source || "",

        url: article.content_urls?.desktop?.page || "",

    };

}

/**
 * Main Service
 */
export async function getWikipediaData(question) {

    const start = Date.now();

    try {
        console.log("Wikipedia Service");
        console.log("Extracting topic...");

        const topic = await extractTopic(question);

        console.log("Topic:", topic);

        console.log("Searching Wikipedia...");

        const articleTitle = await searchWikipedia(topic);

        if (!articleTitle) {

            return {

                success: false,

                message: "No relevant Wikipedia article found.",

            };

        }

        console.log("Best Match:", articleTitle);

        console.log("Fetching article summary...");

        const article = await fetchSummary(articleTitle);

        console.log("Wikipedia article loaded.");

        const end = Date.now();

        console.log(`Wikipedia Service Time: ${end - start} ms`);

        return {

            success: true,

            topic,

            ...article,

        };

    } catch (error) {

        console.error("Wikipedia Service Error");

        console.error(error);

        return {

            success: false,

            message: error.message,

        };

    }

}