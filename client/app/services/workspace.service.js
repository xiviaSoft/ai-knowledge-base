import api from "./api.service";

class WorkspaceService {

    async getAll() {

        const response = await api.get("/workspaces");

        return response.data;

    }

    async create(data) {

        const response = await api.post(

            "/workspaces",

            data

        );

        return response.data;

    }

    async update(id, data) {

        const response = await api.patch(

            `/workspaces/${id}`,

            data

        );

        return response.data;

    }

    async delete(id) {

        const response = await api.delete(

            `/workspaces/${id}`

        );

        return response.data;

    }

}

export default new WorkspaceService();