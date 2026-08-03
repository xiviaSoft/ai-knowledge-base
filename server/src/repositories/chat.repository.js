import prisma from "../config/prisma.js";

class ChatRepository {

    async createConversation(data) {

        return prisma.conversations.create({
            data
        });

    }

    async createMessage(data) {

        return prisma.messages.create({
            data
        });

    }

    async getConversation(id) {

        return prisma.conversations.findUnique({
            where: {
                id
            },
            include: {
                messages: true
            }
        });

    }
    async findConversation(id) {

        return prisma.conversations.findUnique({
            where: {
                id
            }
        });

    }

    async saveMessage(data) {

        return prisma.messages.create({
            data
        });

    }

    async getMessages(conversationId) {

        return prisma.messages.findMany({

            where: {
                conversation_id: conversationId
            },

            orderBy: {
                created_at: "asc"
            }

        });

    }
    async getConversations(workspaceId) {

        return prisma.conversations.findMany({

            where: {
                workspace_id: workspaceId
            },

            orderBy: {
                updated_at: "desc"
            }

        });

    }

    async getConversationMessages(conversationId) {

        return prisma.messages.findMany({

            where: {
                conversation_id: conversationId
            },

            orderBy: {
                created_at: "asc"
            }

        });

    }

    async deleteConversation(conversationId) {

        return prisma.conversations.delete({

            where: {
                id: conversationId
            }

        });

    }

}

export default new ChatRepository();