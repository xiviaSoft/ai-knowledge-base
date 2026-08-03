import dashboardRepository from "../repositories/dashboard.repository.js";
import { serializeBigInt } from "../utils/slug.js";

class DashboardService {

    async getOverview(workspaceId) {

        const overview =
            await dashboardRepository.getOverview(workspaceId);

        return serializeBigInt(overview);

    }

}

export default new DashboardService();