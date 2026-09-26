import prisma from "../config/prisma.js";

class NotificationRepository {
    async create(data) {
        return prisma.notifications.create({
            data
        });
    }

    async findById(id) {
        return prisma.notifications.findUnique({
            where: {
                id
            }
        });
    }

    async findInvitationNotification(userId, invitationId) {
        return prisma.notifications.findFirst({
            where: {
                user_id: userId,
                invitation_id: invitationId,
                type: "WORKSPACE_INVITATION"
            },
            orderBy: {
                created_at: "desc"
            }
        });
    }

    async markAsRead(id, userId) {
        return prisma.notifications.updateMany({
            where: {
                id,
                user_id: userId
            },
            data: {
                is_read: true
            }
        });
    }

    async markAllAsRead(userId) {
        return prisma.notifications.updateMany({
            where: {
                user_id: userId,
                is_read: false
            },
            data: {
                is_read: true
            }
        });
    }

    async findByUserId(userId) {
        return prisma.notifications.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                created_at: "desc"
            }
        });
    }

    async countUnreadByUserId(userId) {
        return prisma.notifications.count({
            where: {
                user_id: userId,
                is_read: false
            }
        });
    }

    async delete(id, userId) {
        return prisma.notifications.deleteMany({
            where: {
                id,
                user_id: userId
            }
        });
    }
}

export default new NotificationRepository();