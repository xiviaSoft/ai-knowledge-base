import app from "./app.js";
import prisma from "./config/prisma.js";
import { env } from "./config/env.js";

async function startServer() {
    try {
        await prisma.$connect();

        console.log("--Database Connected--");

        app.listen(env.PORT, () => {
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