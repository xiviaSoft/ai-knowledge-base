import prisma from "../config/prisma.js";

class ApiKeyRepository {

    async create(data) {

        return prisma.api_keys.create({

            data

        });

    }

    async findAll(workspaceId) {

        return prisma.api_keys.findMany({

            where: {

                workspace_id: workspaceId

            },

            orderBy: {

                created_at: "desc"

            }

        });

    }

    async findByKey(key) {

        return prisma.api_keys.findUnique({

            where: {

                key

            }

        });

    }

    async findById(id) {

        return prisma.api_keys.findUnique({

            where: {

                id

            }

        });

    }

    async delete(id) {

        return prisma.api_keys.delete({

            where: {

                id

            }

        });

    }

}

export default new ApiKeyRepository();