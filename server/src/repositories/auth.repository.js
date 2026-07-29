import prisma from "../config/prisma.js";

class AuthRepository {

    async findUserByEmail(email) {
        return prisma.users.findUnique({
            where: { email }
        });
    }

    async register(data) {
        return prisma.$transaction(async (tx) => {

            const user = await tx.users.create({
                data: data.user
            });

            const workspace = await tx.workspaces.create({
                data: data.workspace
            });

            await tx.workspace_members.create({
                data: data.workspaceMember
            });

            await tx.refresh_tokens.create({
                data: data.refreshToken
            });

            return {
                user,
                workspace
            };

        });
    }
    async findUserByEmail(email) {
        return prisma.users.findUnique({
            where: {
                email
            }
        });
    }

    async updateRefreshToken(userId, token, expiresAt) {
        return prisma.refresh_tokens.updateMany({
            where: {
                user_id: userId
            },
            data: {
                token,
                expires_at: expiresAt
            }
        });
    }

    async findUserById(id) {

        return prisma.users.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                avatar: true,
                is_verified: true,
                created_at: true
            }
        });

    }

    async findRefreshToken(token) {
        return prisma.refresh_tokens.findFirst({
            where: {
                token
            },
            include: {
                users: true
            }
        });
    }

    async deleteRefreshToken(token) {
        return prisma.refresh_tokens.deleteMany({
            where: {
                token
            }
        });
    }

    async deleteRefreshToken(token) {
        return prisma.refresh_tokens.deleteMany({
            where: {
                token
            }
        });
    }

}

export default new AuthRepository();