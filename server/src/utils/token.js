import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function generateAccessToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

export function generateRefreshToken(payload) {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
}