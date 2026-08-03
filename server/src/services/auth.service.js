import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import authRepository from "../repositories/auth.repository.js";
import { generateSlug } from "../utils/slug.js";
import { v4 as uuid } from "uuid";

class AuthService {

    async register(data) {

        const {
            firstName,
            lastName,
            email,
            password,
            workspaceName
        } = data;

        // Check existing user
        const existingUser =
            await authRepository.findUserByEmail(email);

        if (existingUser) {
            throw new Error("Email already exists.");
        }

        // Hash password
        const hashedPassword =
            await hashPassword(password);

        // Generate IDs
        const userId = uuid();
        const workspaceId = uuid();
        const refreshTokenId = uuid();
        const workspaceMemberId = uuid();

        // Workspace slug
        const slug = generateSlug(workspaceName);

        // JWT Payload
        const payload = {
            id: userId,
            email
        };

        // Tokens
        const accessToken =
            generateAccessToken(payload);

        const refreshToken =
            generateRefreshToken(payload);

        // Refresh Token Expiry
        const refreshTokenExpiry =
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // Save everything
        const result =
            await authRepository.register({

                user: {
                    id: userId,
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password: hashedPassword
                },

                workspace: {
                    id: workspaceId,
                    name: workspaceName,
                    slug,
                    owner_id: userId
                },

                workspaceMember: {
                    id: workspaceMemberId,
                    workspace_id: workspaceId,
                    user_id: userId,
                    role: "OWNER"
                },

                refreshToken: {
                    id: refreshTokenId,
                    user_id: userId,
                    token: refreshToken,
                    expires_at: refreshTokenExpiry
                }

            });

        return {

            message: "Registration successful.",

            accessToken,

            refreshToken,

            user: result.user,

            workspace: result.workspace

        };

    }
    // Login service method
    async login(data) {

        const { email, password } = data;

        const user = await authRepository.findUserByEmail(email);
        console.log("LOGIN DEBUG ");
        console.log("Email from request:", email);
        console.log("User found:", user);

        if (!user) {
            throw new Error("Invalid email.");
        }

        const isPasswordValid = await comparePassword(
            password,
            user.password
        );
        console.log("Entered Password:", password);
        console.log("Stored Password:", user.password);
        console.log("Password Match:", isPasswordValid);
        if (!isPasswordValid) {
            throw new Error("Password is incorrect.");
        }

        const payload = {
            id: user.id,
            email: user.email
        };

        const accessToken = generateAccessToken(payload);

        const refreshToken = generateRefreshToken(payload);

        const expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        await authRepository.updateRefreshToken(
            user.id,
            refreshToken,
            expiresAt
        );

        return {
            message: "Login successful.",
            accessToken,
            refreshToken,
            user
        };
    }

    async getCurrentUser(userId) {

        const user = await authRepository.findUserById(userId);

        if (!user) {
            throw new Error("User not found.");
        }

        return user;
    }
    async refreshToken(refreshToken) {

        const storedToken =
            await authRepository.findRefreshToken(refreshToken);

        if (!storedToken) {
            throw new Error("Invalid refresh token.");
        }

        if (storedToken.expires_at < new Date()) {
            throw new Error("Refresh token expired.");
        }

        const payload = {
            id: storedToken.users.id,
            email: storedToken.users.email
        };

        const accessToken =
            generateAccessToken(payload);

        return {
            accessToken
        };
    }

    async logout(refreshToken) {

        const token =
            await authRepository.findRefreshToken(refreshToken);

        if (!token) {
            throw new Error("Refresh token not found.");
        }

        await authRepository.deleteRefreshToken(refreshToken);

        return {
            message: "Logged out successfully."
        };

    }
}

export default new AuthService();