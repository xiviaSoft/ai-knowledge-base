import pineconeRetriever from "../ai/retrievers/pinecone.retrievers.js";
import geminiGenerator from "../ai/generators/gemini.generator.js";
import chatRepository from "../repositories/chat.repository.js";
import conversationRepository from "../repositories/conversation.repository.js";
import promptBuilder from "../ai/generators/prompt.builder.js";
import { v4 as uuid } from "uuid";

class ChatService {
    async prepareQuestion(data) {
        let conversationId = data.conversationId;
        if (!conversationId) {
            const conversation = await chatRepository.createConversation({
                id: uuid(),
                workspace_id: data.workspaceId,
                user_id: data.userId,
                title: data.question.substring(0, 50)
            });
            conversationId = conversation.id;
        }
        await chatRepository.saveMessage({
            id: uuid(),
            conversation_id: conversationId,
            role: "USER",
            content: data.question
        });
        const history = await chatRepository.getMessages(
            conversationId
        );
        const matches = await pineconeRetriever.retrieve(
            data.workspaceId,
            data.question,
            5
        );
        console.log("Retrieved Matches:", matches.length);
        const prompt = promptBuilder.build(
            data.question,
            matches,
            history
        );
        const sources = matches.map((match) => ({
            documentId: match.metadata?.documentId,
            chunkIndex: match.metadata?.chunkIndex,
            score: match.score,
            text: match.metadata?.text || ""
        }));
        return {
            conversationId,
            prompt,
            sources,
            metadata: {
                sourceCount: sources.length,
                retrievedChunks: matches.length
            }
        };
    }

    async streamAnswer(prompt, onToken) {
        return geminiGenerator.generateStream(prompt, onToken);
    }

    async streamQuestion(data, res) {
        const prepared = await this.prepareQuestion(data);
        const {
            conversationId,
            prompt,
            sources,
            metadata
        } = prepared;

        res.write(
            `event: start\ndata: ${JSON.stringify({
                conversationId
            })}\n\n`
        );

        let fullAnswer = "";

        fullAnswer = await this.streamAnswer(prompt, (token) => {
            res.write(
                `event: token\ndata: ${JSON.stringify({
                    token
                })}\n\n`
            );
        });

        await this.saveAssistantMessage(conversationId, fullAnswer);

        res.write(
            `event: done\ndata: ${JSON.stringify({
                conversationId,
                sources,
                metadata
            })}\n\n`
        );

        res.end();
        return fullAnswer;
    }

    async saveAssistantMessage(conversationId, answer) {
        if (!answer?.trim()) {
            throw new Error("AI generated an empty response.");
        }
        await chatRepository.saveMessage({
            id: uuid(),
            conversation_id: conversationId,
            role: "ASSISTANT",
            content: answer
        });
    }

    async getConversations(workspaceId) {
        return await chatRepository.getConversations(
            workspaceId
        );
    }

    async getConversation(id) {
        return await chatRepository.getConversationMessages(
            id
        );
    }

    async deleteConversation(id) {
        return await chatRepository.deleteConversation(
            id
        );
    }

    async searchConversations(workspaceId, keyword) {
        return await conversationRepository.search(
            workspaceId,
            keyword
        );
    }

    async globalSearch(workspaceId, keyword) {
        return await chatRepository.globalSearch(
            workspaceId,
            keyword
        );
    }
}

export default new ChatService();