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
}

export default new AuthRepository();