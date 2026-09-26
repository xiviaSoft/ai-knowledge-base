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
            },
            orderBy: {
                joined_at: "asc"
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

    async findMemberById(memberId) {
    return prisma.workspace_members.findUnique({
        where: {
            id: memberId
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

    async create(data) {
        return prisma.workspace_members.create({
            data,
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

    async updateRole(memberId, role) {
        return prisma.workspace_members.update({
            where: {
                id: memberId
            },
            data: {
                role
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

    async delete(memberId) {
        return prisma.workspace_members.delete({
            where: {
                id: memberId
            }
        });
    }

    async countByWorkspace(workspaceId) {
        return prisma.workspace_members.count({
            where: {
                workspace_id: workspaceId
            }
        });
    }

    async getRecentMembers(workspaceId, limit = 5) {
        return prisma.workspace_members.findMany({
            where: {
                workspace_id: workspaceId
            },
            include: {
                users: {
                    select: {
                        first_name: true,
                        last_name: true
                    }
                }
            },
            orderBy: {
                joined_at: "desc"
            },
            take: limit
        });
    }

    async deleteByWorkspace(workspaceId) {
        return prisma.workspace_members.deleteMany({
            where: {
                workspace_id: workspaceId
            }
        });
    }
    async search(workspaceId, keyword) {
        return prisma.workspace_members.findMany({
            where: {
                workspace_id: workspaceId,
                users: {
                    OR: [
                        {
                            first_name: {
                                contains: keyword
                            }
                        },
                        {
                            last_name: {
                                contains: keyword
                            }
                        },
                        {
                            email: {
                                contains: keyword
                            }
                        }
                    ]
                }
            },
            select: {
                id: true,
                role: true,
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
}

export default new WorkspaceMemberRepository();