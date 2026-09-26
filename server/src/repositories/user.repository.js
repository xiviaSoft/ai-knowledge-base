import prisma from "../config/prisma.js";

class UserRepository {
    async searchUsers(query, currentUserId) {
        return prisma.users.findMany({
            where: {
                id: {
                    not: currentUserId
                },
                OR: [
                    {
                        first_name: {
                            contains: query
                        }
                    },
                    {
                        last_name: {
                            contains: query
                        }
                    },
                    {
                        email: {
                            contains: query
                        }
                    }
                ]
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                avatar: true
            },
            orderBy: {
                first_name: "asc"
            },
            take: 10
        });
    }
}

export default new UserRepository();