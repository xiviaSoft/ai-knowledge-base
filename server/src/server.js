import app from "./app.js";
import prisma from "./config/prisma.js";
import { env } from "./config/env.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import { createServer } from "http";
import { initializeSocket } from "./socket.io/socket.js";

const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

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