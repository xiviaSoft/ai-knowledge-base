import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import authRepository from "../repositories/auth.repository.js";
import { hashPassword } from "../utils/password.js";
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

}

export default new AuthService();