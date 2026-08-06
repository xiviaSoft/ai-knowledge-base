import api from "./api.service";

class WorkspaceService {

    async getAll() {

        const response = await api.get("/workspaces");

        return response.data;

    }

    async create(data: any) {

        const response = await api.post(

            "/workspaces",

            data

        );

        return response.data;

    }

    async update(id: any, data: any) {

        const response = await api.patch(

            `/workspaces/${id}`,

            data

        );

        return response.data;

    }

    async delete(id: any) {

        const response = await api.delete(

            `/workspaces/${id}`

        );

        return response.data;

    }
    async getById(workspaceId: string) {

        const { data } = await api.get(

            `/workspaces/${workspaceId}`

        );

        return data;

    }
    
}

export default new WorkspaceService();