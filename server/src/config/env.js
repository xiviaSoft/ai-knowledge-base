import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
    "PORT",
    "DATABASE_URL",
    // "JWT_SECRET",
    // "JWT_REFRESH_SECRET"
];

for (const variable of requiredEnv) {
    if (!process.env[variable]) {
        throw new Error(`Missing environment variable: ${variable}`);
    }
}

export const env = {
    PORT: Number(process.env.PORT),
    DATABASE_URL: process.env.DATABASE_URL,
    // JWT_SECRET: process.env.JWT_SECRET,
    // JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    // NODE_ENV: process.env.NODE_ENV || "development"
};