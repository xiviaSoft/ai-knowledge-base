import prisma from "../config/prisma.js";

class ConversationRepository {

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

            orderBy: {

                created_at: "desc"

            },

            take: limit,

            select: {

                id: true,

                title: true,

                created_at: true

            }

        });

    }

    async findById(id) {

        return prisma.conversations.findUnique({

            where: {

                id

            }

        });

    }

    async create(data) {

        return prisma.conversations.create({

            data

        });

    }

    async update(id, data) {

        return prisma.conversations.update({

            where: {

                id

            },

            data

        });

    }

    async delete(id) {

        return prisma.conversations.delete({

            where: {

                id

            }

        });

    }

}

export default new ConversationRepository();