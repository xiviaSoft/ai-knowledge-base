import api from "./api.service";

export interface Workspace {
    id: string;
    name: string;
    slug: string;
    plan?: string | null;
    owner_id: string;
    created_at?: string;
    updated_at?: string;
}

export interface UpdateWorkspacePayload {
    name: string;
}

class WorkspaceService {
    async getAll() {
        const response = await api.get(
            "/workspaces"
        );

        return response.data;
    }

    async create(data: { name: string }) {
        const response = await api.post(
            "/workspaces",
            data
        );

        return response.data;
    }

    async getById(
        workspaceId: string
    ): Promise<Workspace> {
        const response = await api.get(
            `/workspaces/${workspaceId}`
        );

        return response.data.data;
    }

    async update(
        workspaceId: string,
        data: UpdateWorkspacePayload
    ): Promise<Workspace> {
        const response = await api.patch(
            `/workspaces/${workspaceId}`,
            data
        );

        return response.data.workspace;
    }

    async delete(
        workspaceId: string
    ) {
        const response = await api.delete(
            `/workspaces/${workspaceId}`
        );

        return response.data;
    }

    async getDashboard(
        workspaceId: string
    ) {
        const response = await api.get(
            `/workspaces/${workspaceId}/dashboard`
        );

        return response.data.data;
    }
}

export default new WorkspaceService();