import notificationRepository from "../repositories/notification.repository.js";
import { getIO } from "../socket.io/socket.js";
import { v4 as uuid } from "uuid";

class NotificationService {
    async create(data) {
        const notification =
            await notificationRepository.create({
                id: uuid(),
                user_id: data.userId,
                workspace_id: data.workspaceId,
                invitation_id: data.invitationId || null,
                type: data.type,
                title: data.title,
                message: data.message,
                is_read: false
            });

        getIO()
            .to(`user:${notification.user_id}`)
            .emit(
                "notification:new",
                notification
            );

        return notification;
    }

    async getUserNotifications(userId) {
        return notificationRepository.findByUserId(userId);
    }

    async getUnreadCount(userId) {
        return notificationRepository.countUnreadByUserId(
            userId
        );
    }

    async markAsRead(notificationId, userId) {
        return notificationRepository.markAsRead(
            notificationId,
            userId
        );
    }

    async markAllAsRead(userId) {
        return notificationRepository.markAllAsRead(
            userId
        );
    }

    async delete(notificationId, userId) {
        return notificationRepository.delete(
            notificationId,
            userId
        );
    }
}

export default new NotificationService();