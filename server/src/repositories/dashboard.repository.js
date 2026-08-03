import prisma from "../config/prisma.js";

class DashboardRepository {

    async getOverview(workspaceId) {

        const [
            totalDocuments,
            totalConversations,
            totalMessages,
            recentDocuments,
            recentConversations
        ] = await Promise.all([

            prisma.documents.count({
                where: {
                    workspace_id: workspaceId
                }
            }),

            prisma.conversations.count({
                where: {
                    workspace_id: workspaceId
                }
            }),

            prisma.messages.count({
                where: {
                    conversations: {
                        workspace_id: workspaceId
                    }
                }
            }),

            prisma.documents.findMany({

                where: {
                    workspace_id: workspaceId
                },

                orderBy: {
                    created_at: "desc"
                },

                take: 5

            }),

            prisma.conversations.findMany({

                where: {
                    workspace_id: workspaceId
                },

                orderBy: {
                    created_at: "desc"
                },

                take: 5

            })

        ]);

        return {
            totalDocuments,
            totalConversations,
            totalMessages,
            recentDocuments,
            recentConversations
        };

    }

}

export default new DashboardRepository();