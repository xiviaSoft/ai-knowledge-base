import api from "./api.service";

class NotificationService {
    async getNotifications() {
        const response = await api.get("/notifications");
        return response.data.data;
    }

    async getUnreadCount() {
        const response = await api.get(
            "/notifications/unread-count"
        );
        return response.data.data.count;
    }

    async markAsRead(notificationId) {
        const response = await api.patch(
            `/notifications/${notificationId}/read`
        );
        return response.data;
    }

    async markAllAsRead() {
        const response = await api.patch(
            "/notifications/read-all"
        );
        return response.data;
    }

    async deleteNotification(notificationId) {
        const response = await api.delete(
            `/notifications/${notificationId}`
        );
        return response.data;
    }

    async acceptInvitation(invitationId) {
        const response = await api.patch(
            `/invitations/${invitationId}/accept`
        );
        return response.data;
    }

    async rejectInvitation(invitationId) {
        const response = await api.patch(
            `/invitations/${invitationId}/reject`
        );
        return response.data;
    }
}

export default new NotificationService();