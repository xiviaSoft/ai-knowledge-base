class PromptBuilder {

    build(question, matches, history = []) {

        const validMatches = matches.filter(
            match => match.score > 0.7
        );
        const context = validMatches
            .map(match => match.metadata.text)
            .join("\n\n");

        const conversation = history
            .map(message => `${message.role}: ${message.content}`)
            .join("\n");

        if (validMatches.length === 0) {
            return `No relevant context was found. Question: ${question}`;
        }

        return `You are an AI assistant. Answer ONLY using the provided context. Conversation History: ${conversation}Context: ${context} Current Question: ${question} `;

    }

}

export default new PromptBuilder();