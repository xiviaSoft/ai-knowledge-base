"use client";
import notificationService from "../services/notification.service.js";
import { connectSocket, disconnectSocket } from "../lib/socket.js";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

type Notification = {
    id: string;
    user_id: string;
    workspace_id: string | null;
    invitation_id: string | null;
    type: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
};

const getErrorMessage = (
    error: unknown,
    fallback: string
): string => {
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
    ) {
        const response = (
            error as {
                response?: {
                    data?: {
                        message?: unknown;
                    };
                };
            }
        ).response;


        if (
            typeof response?.data?.message === "string" &&
            response.data.message
        ) {
            return response.data.message;
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;


};

export default function useNotifications() {
    const { token } = useAuth();


    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const [notificationData, count] =
                await Promise.all([
                    notificationService.getNotifications(),
                    notificationService.getUnreadCount()
                ]);

            setNotifications(notificationData || []);
            setUnreadCount(count || 0);
        } catch (error: unknown) {
            setError(
                getErrorMessage(
                    error,
                    "Failed to load notifications."
                )
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const markAsRead = useCallback(
        async (notificationId: string) => {
            const notification = notifications.find(
                (item) => item.id === notificationId
            );

            if (!notification || notification.is_read) {
                return;
            }

            try {
                await notificationService.markAsRead(
                    notificationId
                );

                setNotifications((current) =>
                    current.map((item) =>
                        item.id === notificationId
                            ? {
                                ...item,
                                is_read: true
                            }
                            : item
                    )
                );

                setUnreadCount((current) =>
                    Math.max(0, current - 1)
                );
            } catch (error: unknown) {
                const message = getErrorMessage(
                    error,
                    "Failed to mark notification as read."
                );

                setError(message);
                throw new Error(message);
            }
        },
        [notifications]
    );

    const markAllAsRead = useCallback(async () => {
        try {
            setActionLoading(true);
            setError("");

            await notificationService.markAllAsRead();

            setNotifications((current) =>
                current.map((notification) => ({
                    ...notification,
                    is_read: true
                }))
            );

            setUnreadCount(0);
        } catch (error: unknown) {
            const message = getErrorMessage(
                error,
                "Failed to mark notifications as read."
            );

            setError(message);
            throw new Error(message);
        } finally {
            setActionLoading(false);
        }
    }, []);

    const deleteNotification = useCallback(
        async (notificationId: string) => {
            const notification = notifications.find(
                (item) => item.id === notificationId
            );

            try {
                setActionLoading(true);
                setError("");

                await notificationService.deleteNotification(
                    notificationId
                );

                setNotifications((current) =>
                    current.filter(
                        (item) => item.id !== notificationId
                    )
                );

                if (
                    notification &&
                    !notification.is_read
                ) {
                    setUnreadCount((current) =>
                        Math.max(0, current - 1)
                    );
                }
            } catch (error: unknown) {
                const message = getErrorMessage(
                    error,
                    "Failed to delete notification."
                );

                setError(message);
                throw new Error(message);
            } finally {
                setActionLoading(false);
            }
        },
        [notifications]
    );

    const acceptInvitation = useCallback(
        async (invitationId: string) => {
            try {
                const notification = notifications.find(
                    (item) => item.invitation_id === invitationId
                );

                await notificationService.acceptInvitation(
                    invitationId
                );

                window.dispatchEvent(
                    new Event("workspace:updated")
                );

                setNotifications((current) =>
                    current.map((item) =>
                        item.invitation_id === invitationId
                            ? {
                                ...item,
                                is_read: true
                            }
                            : item
                    )
                );

                if (notification && !notification.is_read) {
                    setUnreadCount((current) =>
                        Math.max(0, current - 1)
                    );
                }

                await fetchNotifications();
            } catch (error: unknown) {
                const message = getErrorMessage(
                    error,
                    "Failed to accept invitation."
                );

                setError(message);
                throw new Error(message);
            }
        },
        [notifications, fetchNotifications]
    );

    const rejectInvitation = useCallback(
        async (invitationId: string) => {
            try {
                const notification = notifications.find(
                    (item) => item.invitation_id === invitationId
                );

                await notificationService.rejectInvitation(
                    invitationId
                );

                setNotifications((current) =>
                    current.map((item) =>
                        item.invitation_id === invitationId
                            ? {
                                ...item,
                                is_read: true
                            }
                            : item
                    )
                );

                if (notification && !notification.is_read) {
                    setUnreadCount((current) =>
                        Math.max(0, current - 1)
                    );
                }

                await fetchNotifications();
            } catch (error: unknown) {
                const message = getErrorMessage(
                    error,
                    "Failed to reject invitation."
                );

                setError(message);
                throw new Error(message);
            }
        },
        [notifications, fetchNotifications]
    );

    useEffect(() => {
        fetchNotifications();

        if (!token) {
            return;
        }

        const socket = connectSocket(token);

        const handleNewNotification = (
            notification: Notification
        ) => {
            setNotifications((current) => {
                const exists = current.some(
                    (item) => item.id === notification.id
                );

                if (exists) {
                    return current;
                }

                return [notification, ...current];
            });

            setUnreadCount((current) => current + 1);
        };

        socket.on(
            "notification:new",
            handleNewNotification
        );

        return () => {
            socket.off(
                "notification:new",
                handleNewNotification
            );

            disconnectSocket();
        };
    }, [fetchNotifications, token]);

    return {
        notifications,
        unreadCount,
        loading,
        actionLoading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        acceptInvitation,
        rejectInvitation
    };

}
