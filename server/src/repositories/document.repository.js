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

}

export default new DocumentRepository();