import api from "./api.service";

class MemberService {
    async getAll(workspaceId: string) {
        const { data } = await api.get(
            `/workspaces/${workspaceId}/members`
        );

        return data;
    }

    async getById(
        workspaceId: string,
        memberId: string
    ) {
        const { data } = await api.get(
            `/workspaces/${workspaceId}/members/${memberId}`
        );

        return data;
    }

    async create(
        workspaceId: string,
        payload: {
            email: string;
            role: string;
        }
    ) {
        const { data } = await api.post(
            `/workspaces/${workspaceId}/members`,
            payload
        );

        return data;
    }

    async updateRole(
        workspaceId: string,
        memberId: string,
        role: string
    ) {
        const { data } = await api.patch(
            `/workspaces/${workspaceId}/members/${memberId}`,
            { role }
        );

        return data;
    }

    async delete(
        workspaceId: string,
        memberId: string
    ) {
        const { data } = await api.delete(
            `/workspaces/${workspaceId}/members/${memberId}`
        );

        return data;
    }
}

export default new MemberService();