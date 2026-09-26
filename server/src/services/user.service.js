import userRepository from "../repositories/user.repository.js";

class UserService {
    async searchUsers(query, workspaceId, currentUserId) {
        if (!query || !query.trim()) {
            return [];
        }


        if (!workspaceId) {
            throw new ApiError(
                400,
                "Workspace ID is required."
            );
        }

        const normalizedQuery = query.trim();

        return userRepository.searchUsers(
            normalizedQuery,
            workspaceId,
            currentUserId
        );


    }

}
export default new UserService();