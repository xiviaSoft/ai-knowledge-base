import { io } from "socket.io-client";

let socket;

export function getSocket(token) {
    if (!socket) {
        socket = io(
            'http://localhost:5000',
            {
                auth: {
                    token
                },
                withCredentials: true,
                autoConnect: false
            }
        );

        socket.on(
            "connect",
            () => {
                console.log(
                    "🔌 Socket connected:",
                    socket.id
                );
            }
        );

        socket.on(
            "connect_error",
            (error) => {
                console.error(
                    "❌ Socket connection error:",
                    error.message
                );
            }
        );

        socket.on(
            "disconnect",
            (reason) => {
                console.log(
                    "🔌 Socket disconnected:",
                    reason
                );
            }
        );
    }

    return socket;
}

export function connectSocket(token) {
    const currentSocket = getSocket(token);

    currentSocket.auth = {
        token
    };

    if (!currentSocket.connected) {
        currentSocket.connect();
    }

    return currentSocket;
}

export function disconnectSocket() {
    if (socket?.connected) {
        socket.disconnect();
    }
}