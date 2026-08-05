import prisma from "../config/prisma.js";

class DocumentRepository {

    async create(data) {

        return prisma.documents.create({
            data
        });

    }
    async updateStatus(id, status) {

        return prisma.documents.update({

            where: {
                id
            },

            data: {
                status
            }

        });

    }

    async findAllByWorkspace(workspaceId) {

        return prisma.documents.findMany({

            where: {
                workspace_id: workspaceId
            },

            orderBy: {
                created_at: "desc"
            }

        });

    }

    async findById(id) {

        return prisma.documents.findUnique({

            where: {
                id
            }

        });

    }

    async delete(id) {

        return prisma.documents.delete({

            where: {
                id
            }

        });

    }

    async findById(id) {

        return prisma.documents.findUnique({

            where: {
                id
            }

        });

    }
    async countByWorkspace(workspaceId) {

        return prisma.documents.count({

            where: {
                workspace_id: workspaceId
            }

        });

    }

    async sumStorage(workspaceId) {

        const result = await prisma.documents.aggregate({

            where: {
                workspace_id: workspaceId
            },

            _sum: {
                file_size: true
            }

        });

        return result._sum.file_size ?? BigInt(0);

    }

    async getRecent(workspaceId, limit = 5) {

        return prisma.documents.findMany({

            where: {
                workspace_id: workspaceId
            },

            select: {
                id: true,
                original_name: true,
                status: true,
                created_at: true
            },

            orderBy: {
                created_at: "desc"
            },

            take: limit

        });

    }
    async getRecentDocuments(workspaceId, limit = 5) {

        return prisma.documents.findMany({

            where: {

                workspace_id: workspaceId

            },

            select: {

                original_name: true,

                created_at: true

            },

            orderBy: {

                created_at: "desc"

            },

            take: limit

        });

    }
    async findAll(workspaceId) {

        return prisma.documents.findMany({

            where: {

                workspace_id: workspaceId

            }

        });

    }
}

export default new DocumentRepository();