import pineconeRetriever from '../ai/retrievers/pinecone.retrievers.js';
import geminiGenerator from "../ai/generators/gemini.generator.js";
import chatRepository from "../repositories/chat.repository.js";
import promptBuilder from "../ai/generators/prompt.builder.js";
import { generateConversationTitle } from './gemini.service.js';
import { v4 as uuid } from "uuid";
class ChatService {

    async askQuestion(data) {

        let conversationId = data.conversationId;

        if (!conversationId) {
            const conversation =
                await chatRepository.createConversation({
                    id: uuid(),
                    workspace_id: data.workspaceId,
                    user_id: data.userId,
                    title: data.question.substring(0, 50)
                });
            conversationId = conversation.id;

            if (!conversation.title) {
                try {
                    const title =
                        await generateConversationTitle(data.question);
                    await conversationRepository.updateTitle(
                        conversation.id,
                        title
                    );
                    conversation.title = title;
                }
                catch (error) {
                    console.error("Title generation failed:", error);
                }

            }
        }

        await chatRepository.saveMessage({
            id: uuid(),
            conversation_id: conversationId,
            role: "USER",
            content: data.question
        });
        const history =
            await chatRepository.getMessages(
                conversationId
            );
        const matches = await pineconeRetriever.retrieve(
            data.workspaceId,
            data.question,
            5
        );

        console.log("Retrieved Matches:", matches);
        const prompt = promptBuilder.build(
            data.question,
            matches,
            history
        );

        const answer = await geminiGenerator.generate(prompt);

        await chatRepository.saveMessage({
            id: uuid(),
            conversation_id: conversationId,
            role: "ASSISTANT",
            content: answer
        });

        const sources = matches.map(match => ({
            documentId: match.metadata.documentId,
            chunkIndex: match.metadata.chunkIndex,
            score: match.score
        }));
        return {
            conversationId,
            answer,
            sources
        };

    }

    async getConversations(workspaceId) {
        return await chatRepository.getConversations(workspaceId);
    }

    async getConversation(id) {
        return await chatRepository.getConversationMessages(id);
    }

    async deleteConversation(id) {
        return await chatRepository.deleteConversation(id);
    }
    async searchConversations(workspaceId, keyword) {

        return conversationRepository.search(

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