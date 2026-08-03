import prisma from "../config/prisma.js";

class WorkspaceMemberRepository {

    async findAll(workspaceId) {

        return prisma.workspace_members.findMany({

            where: {
                workspace_id: workspaceId
            },

            include: {
                users: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        avatar: true
                    }
                }
            }

        });

    }

    async findUserByEmail(email) {

        return prisma.users.findUnique({

            where: {
                email
            }

        });

    }

    async findMember(workspaceId, userId) {

        return prisma.workspace_members.findFirst({

            where: {

                workspace_id: workspaceId,

                user_id: userId

            }

        });

    }

    async create(data) {

        return prisma.workspace_members.create({

            data

        });

    }

    async updateRole(memberId, role) {

        return prisma.workspace_members.update({

            where: {
                id: memberId
            },

            data: {
                role
            }

        });

    }

    async findById(memberId) {

        return prisma.workspace_members.findUnique({
            where: {
                id: memberId
            }
        });
    }

    async delete(memberId) {

        return prisma.workspace_members.delete({

            where: {
                id: memberId
            }

        });

    }

}

export default new WorkspaceMemberRepository();