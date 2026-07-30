import prisma from "../config/prisma.js";

class ChunkRepository {

    async createMany(chunks) {

        return prisma.document_chunks.createMany({
            data: chunks
        });

    }

}

export default new ChunkRepository();