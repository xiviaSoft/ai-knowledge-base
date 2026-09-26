import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

let io;

export function initializeSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: env.FRONTEND_URL,
            credentials: true
        }
    });

    io.use((socket, next) => {
        try {
            const token =
                socket.handshake.auth?.token;

            if (!token) {
                return next(
                    new Error("Authentication required.")
                );
            }

            const decoded = jwt.verify(
                token,
                env.JWT_SECRET
            );

            socket.userId = decoded.id;

            next();
        } catch (error) {
            next(
                new Error("Invalid authentication token.")
            );
        }
    });

    io.on("connection", (socket) => {
        socket.join(`user:${socket.userId}`);

        console.log(
            `🔌 User ${socket.userId} connected: ${socket.id}`
        );

        socket.on("disconnect", () => {
            console.log(
                `🔌 User ${socket.userId} disconnected: ${socket.id}`
            );
        });
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error(
            "Socket.IO has not been initialized."
        );
    }

    return io;
}