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

}

export default new ChatRepository();