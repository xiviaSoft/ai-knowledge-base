import { v4 as uuid } from "uuid";
import chatRepository from "../repositories/chat.repository.js";

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

        }

        await chatRepository.saveMessage({

            id: uuid(),

            conversation_id: conversationId,

            role: "USER",

            content: data.question

        });

        return {

            conversationId,

            message: "Question saved successfully."

        };

    }

}

export default new ChatService();