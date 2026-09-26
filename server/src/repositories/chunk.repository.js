import prisma from "../config/prisma.js";

class ChunkRepository {
    async createMany(data) {
        return prisma.document_chunks.createMany({
            data
        });
    }

    async deleteByDocumentId(documentId) {
        return prisma.document_chunks.deleteMany({
            where: {
                document_id: documentId
            }
        });
    }

    async countByDocumentId(documentId) {
        return prisma.document_chunks.count({
            where: {
                document_id: documentId
            }
        });
    }

  async findByDocumentId(documentId) {
    return prisma.document_chunks.findMany({
        where: {
            document_id: documentId
        },
        orderBy: {
            chunk_index: "asc"
        }
    });
}
}

export default new ChunkRepository();