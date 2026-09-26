import prisma from "../config/prisma.js";

class WorkspaceInvitationRepository {
    async findById(id) {
        return prisma.workspace_invitations.findUnique({
            where: {
                id
            },
            include: {
                workspaces: true,
                users_workspace_invitations_inviter_idTousers: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        avatar: true
                    }
                },
                users_workspace_invitations_invitee_idTousers: {
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

    async findPendingByUser(workspaceId, inviteeId) {
        return prisma.workspace_invitations.findFirst({
            where: {
                workspace_id: workspaceId,
                invitee_id: inviteeId,
                status: "PENDING"
            }
        });
    }

    async findPendingByEmail(workspaceId, email) {
        return prisma.workspace_invitations.findFirst({
            where: {
                workspace_id: workspaceId,
                email,
                status: "PENDING"
            }
        });
    }

    async findAllByWorkspace(workspaceId) {
        return prisma.workspace_invitations.findMany({
            where: {
                workspace_id: workspaceId
            },
            include: {
                users_workspace_invitations_inviter_idTousers: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        avatar: true
                    }
                },
                users_workspace_invitations_invitee_idTousers: {
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
                created_at: "desc"
            }
        });
    }

    async create(data) {
        return prisma.workspace_invitations.create({
            data,
            include: {
                workspaces: true,
                users_workspace_invitations_inviter_idTousers: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        avatar: true
                    }
                },
                users_workspace_invitations_invitee_idTousers: {
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

    async updateStatus(id, status, acceptedAt = null) {
        return prisma.workspace_invitations.update({
            where: {
                id
            },
            data: {
                status,
                accepted_at: acceptedAt
            }
        });
    }

    async delete(id) {
        return prisma.workspace_invitations.delete({
            where: {
                id
            }
        });
    }

    async deleteExpired() {
        return prisma.workspace_invitations.deleteMany({
            where: {
                status: "PENDING",
                expires_at: {
                    lt: new Date()
                }
            }
        });
    }
}

export default new WorkspaceInvitationRepository();