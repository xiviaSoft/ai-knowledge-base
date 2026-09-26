"use client";
import { connectSocket, disconnectSocket } from "@/app/lib/socket";
import type { Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

export function useSocket(token: string | null | undefined) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        const socket = connectSocket(token) as Socket;

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("🔌 Socket connected:", socket.id);
        });

        socket.on("connect_error", (error: Error) => {
            console.error("Socket connection error:", error.message);
        });

        socket.on("disconnect", (reason: string) => {
            console.log("🔌 Socket disconnected:", reason);
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off("disconnect");
            disconnectSocket();
        };
    }, [token]);

    return socketRef;
}