import prisma from "../config/prisma.js";

class WorkspaceRepository {

    async create(data) {
        return prisma.workspaces.create({
            data
        });
    }

    async findBySlug(slug) {
        return prisma.workspaces.findUnique({
            where: {
                slug
            }
        });
    }

    async findByOwner(ownerId) {
        return prisma.workspaces.findMany({
            where: {
                owner_id: ownerId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                plan: true,
                created_at: true,
                updated_at: true
            },
            orderBy: {
                created_at: "desc"
            }
        });
    }

    async findById(id) {
        return prisma.workspaces.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                slug: true,
                plan: true,
                owner_id: true,
                created_at: true,
                updated_at: true
            }
        });
    }

    async findMember(workspaceId, userId) {
        return prisma.workspace_members.findUnique({
            where: {
                workspace_id_user_id: {
                    workspace_id: workspaceId,
                    user_id: userId
                }
            },
            select: {
                id: true,
                workspace_id: true,
                user_id: true,
                role: true
            }
        });
    }

    async update(id, data) {
        return prisma.workspaces.update({
            where: {
                id
            },
            data
        });
    }

    async findByNameAndOwner(name, ownerId) {
        return prisma.workspaces.findFirst({
            where: {
                name,
                owner_id: ownerId
            }
        });
    }

    async delete(id) {
        return prisma.workspaces.delete({
            where: {
                id
            }
        });
    }
}

export default new WorkspaceRepository();
