import api from "./api.service";

const userService = {
    async searchUsers(
        workspaceId: string,
        query: string
    ) {
        const response = await api.get(
            `/workspaces/${workspaceId}/users/search`,
            {
                params: {
                    query
                }
            }
        );


        return response.data.data;
    }

};

export default userService;
