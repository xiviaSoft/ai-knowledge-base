import pineconeRetriever from "../ai/retrievers/pinecone.retrievers.js";
import geminiGenerator from "../ai/generators/gemini.generator.js";
import chatRepository from "../repositories/chat.repository.js";
import conversationRepository from "../repositories/conversation.repository.js";
import promptBuilder from "../ai/generators/prompt.builder.js";
import { generateConversationTitle } from "./gemini.service.js";
import { v4 as uuid } from "uuid";


class ChatService {

    async askQuestion(data) {

        let conversationId = data.conversationId;

        /*
        |--------------------------------------------------------------------------
        | Create conversation if needed
        |--------------------------------------------------------------------------
        */

        if (!conversationId) {

            const conversation =
                await chatRepository.createConversation({

                    id: uuid(),

                    workspace_id:
                        data.workspaceId,

                    user_id:
                        data.userId,

                    title:
                        data.question.substring(0, 50)

                });

            conversationId =
                conversation.id;

        }


        /*
        |--------------------------------------------------------------------------
        | Save user message
        |--------------------------------------------------------------------------
        */

        await chatRepository.saveMessage({

            id: uuid(),

            conversation_id:
                conversationId,

            role: "USER",

            content:
                data.question

        });


        /*
        |--------------------------------------------------------------------------
        | Get conversation history
        |--------------------------------------------------------------------------
        */

        const history =
            await chatRepository.getMessages(
                conversationId
            );


        /*
        |--------------------------------------------------------------------------
        | Retrieve relevant document chunks
        |--------------------------------------------------------------------------
        */

        const matches =
            await pineconeRetriever.retrieve(

                data.workspaceId,

                data.question,

                5

            );


        console.log(
            "Retrieved Matches:",
            matches.length
        );


        /*
        |--------------------------------------------------------------------------
        | Build RAG prompt
        |--------------------------------------------------------------------------
        */

        const prompt =
            promptBuilder.build(

                data.question,

                matches,

                history

            );


        /*
        |--------------------------------------------------------------------------
        | Generate AI response
        |--------------------------------------------------------------------------
        */

        const answer =
            await geminiGenerator.generate(
                prompt
            );


        if (!answer?.trim()) {

            throw new Error(
                "AI generated an empty response."
            );

        }


        console.log(
            "Gemini Response:",
            answer
        );


        /*
        |--------------------------------------------------------------------------
        | Save assistant message
        |--------------------------------------------------------------------------
        */

        await chatRepository.saveMessage({

            id: uuid(),

            conversation_id:
                conversationId,

            role: "ASSISTANT",

            content:
                answer

        });


        /*
        |--------------------------------------------------------------------------
        | Build sources
        |--------------------------------------------------------------------------
        */

        const sources =
            matches.map(
                (match) => ({

                    documentId:
                        match.metadata?.documentId,

                    chunkIndex:
                        match.metadata?.chunkIndex,

                    score:
                        match.score,

                    text:
                        match.metadata?.text || ""

                })
            );


        /*
        | Return frontend-friendly response
        */

        return {

            conversationId,

            answer,

            sources,

            metadata: {

                sourceCount:
                    sources.length,

                retrievedChunks:
                    matches.length

            }

        };

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


    async searchConversations(
        workspaceId,
        keyword
    ) {

        return await conversationRepository.search(

            workspaceId,

            keyword

        );

    }


    async globalSearch(
        workspaceId,
        keyword
    ) {

        return await chatRepository.globalSearch(

            workspaceId,

            keyword

        );

    }

}


export default new ChatService();