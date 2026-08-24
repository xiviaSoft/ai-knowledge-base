import api from "./api.service";

class DashboardService {
    async getDashboard(workspaceId: string) {
        const { data } = await api.get(
            `/workspaces/${workspaceId}/dashboard`
        );
        return data;
    }
    async getRecentActivity(workspaceId: string) {
        const { data } = await api.get(
            `/workspaces/${workspaceId}/activity`
        );
        return data;
    }
}
export default new DashboardService();