import app from "./app.js";
import prisma from "./config/prisma.js";
import { env } from "./config/env.js";
import { createServer } from "http";
import { initializeSocket } from "./socket.io/socket.js";

const httpServer = createServer(app);

initializeSocket(httpServer);

async function startServer() {
    try {
        await prisma.$connect();

        console.log("--Database Connected--");

        httpServer.listen(env.PORT, () => {
            console.log(
                `🚀 Server running at http://localhost:${env.PORT}`
            );
        });
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
}

startServer();