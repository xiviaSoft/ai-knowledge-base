import notificationService from "../services/notification.service.js";

class NotificationController {
    async getNotifications(req, res, next) {
        try {
            const notifications =
                await notificationService.getUserNotifications(
                    req.user.id
                );

            res.status(200).json({
                success: true,
                data: notifications
            });
        } catch (error) {
            next(error);
        }
    }

    async getUnreadCount(req, res, next) {
        try {
            const count =
                await notificationService.getUnreadCount(
                    req.user.id
                );

            res.status(200).json({
                success: true,
                data: {
                    count
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async markAsRead(req, res, next) {
        try {
            await notificationService.markAsRead(
                req.params.id,
                req.user.id
            );

            res.status(200).json({
                success: true,
                message: "Notification marked as read."
            });
        } catch (error) {
            next(error);
        }
    }

    async markAllAsRead(req, res, next) {
        try {
            await notificationService.markAllAsRead(
                req.user.id
            );

            res.status(200).json({
                success: true,
                message: "All notifications marked as read."
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteNotification(req, res, next) {
        try {
            await notificationService.delete(
                req.params.id,
                req.user.id
            );

            res.status(200).json({
                success: true,
                message: "Notification deleted successfully."
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new NotificationController();