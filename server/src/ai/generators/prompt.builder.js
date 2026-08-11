class PromptBuilder {

    build(question, matches = [], history = []) {

        /*
        | Keep only matches that actually contain text
        */

        const validMatches = matches.filter(
            (match) =>
                match?.metadata?.text &&
                typeof match.metadata.text === "string"
        );


        /*
        | Build document context
        */

        const context = validMatches
            .map((match, index) => {

                const score =
                    typeof match.score === "number"
                        ? match.score.toFixed(4)
                        : "N/A";

                return `
[Document Chunk ${index + 1}]
Similarity Score: ${score}

${match.metadata.text}
`;

            })
            .join("\n");


        /*
        | Build conversation history
        */

        const conversation = history
            .slice(-10)
            .map(
                (message) =>
                    `${message.role}: ${message.content}`
            )
            .join("\n");


        /*
        | No context
        */

        if (validMatches.length === 0) {

            return `
You are an AI assistant for a private knowledge base.

The user's question is:

${question}

No relevant information was retrieved from the user's uploaded documents.

You MUST NOT answer using your general knowledge.

Respond exactly with the meaning:

"I couldn't find relevant information in the uploaded documents."

Do not invent information.
Do not speculate.
Do not provide unrelated general explanations.
`;

        }


        /*
        | RAG prompt
        */

        return `
You are an AI assistant for a private document knowledge base.

Your job is to answer the user's question using ONLY the information
contained in the provided document context.

IMPORTANT RULES:

1. Use ONLY the provided document context.
2. Do NOT use your general knowledge to fill missing information.
3. Do NOT invent facts.
4. If the context does not contain enough information to answer the question,
   clearly say that the information was not found in the uploaded documents.
5. Keep the answer directly related to the user's question.
6. Prefer a concise and factual answer.
7. When possible, combine information from multiple relevant chunks.
8. Conversation history is provided only to understand follow-up questions.
   It is NOT a source of factual information.

Conversation History:

${conversation || "No previous conversation."}


Document Context:

${context}


Current Question:

${question}


Answer:
`;

    }

}

export default new PromptBuilder();