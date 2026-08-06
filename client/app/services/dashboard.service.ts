import api from "./api.service";


class DashboardService {

    async getDashboard(workspaceId: string) {

        const { data } = await api.get(

            `/workspaces/${workspaceId}/dashboard`

        );

        return data;

    }

}

export default new DashboardService();