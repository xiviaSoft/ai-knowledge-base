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
    async countByWorkspace(workspaceId) {

        return prisma.conversations.count({

            where: {
                workspace_id: workspaceId
            }

        });

    }

    async getRecent(workspaceId, limit = 5) {

        return prisma.conversations.findMany({

            where: {
                workspace_id: workspaceId
            },

            select: {

                id: true,

                title: true,

                created_at: true

            },

            orderBy: {

                created_at: "desc"

            },

            take: limit

        });

    }
    async updateTitle(id, title) {

        return prisma.conversations.update({

            where: {
                id
            },

            data: {
                title
            }

        });

    }
    async search(workspaceId, keyword) {

        return prisma.conversations.findMany({
            where: {
                workspace_id: workspaceId,
                title: {
                    contains: keyword
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });
    }
    async getRecentConversations(workspaceId, limit = 5) {

        return prisma.conversations.findMany({

            where: {

                workspace_id: workspaceId

            },

            select: {

                title: true,

                created_at: true

            },

            orderBy: {

                created_at: "desc"

            },

            take: limit

        });

    }
    async deleteMessagesByWorkspace(workspaceId) {

        return prisma.messages.deleteMany({

            where: {

                conversations: {

                    workspace_id: workspaceId

                }

            }

        });

    }

    async deleteConversationsByWorkspace(workspaceId) {

        return prisma.conversations.deleteMany({

            where: {

                workspace_id: workspaceId

            }

        });

    }
    async globalSearch(workspaceId, keyword) {

        const documents = await prisma.documents.findMany({

            where: {

                workspace_id: workspaceId,

                original_name: {

                    contains: keyword

                }

            },

            select: {

                id: true,

                original_name: true

            }

        });

        const conversations = await prisma.conversations.findMany({

            where: {

                workspace_id: workspaceId,

                title: {

                    contains: keyword

                }

            },

            select: {

                id: true,

                title: true

            }

        });

        return {

            documents,

            conversations

        };

    }

}

export default new ChatRepository();