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

}

export default new DocumentRepository();