import dashboardService from "../services/dashboard.service.js";

class DashboardController {

    async getOverview(req, res, next) {

        try {

            const data =
                await dashboardService.getOverview(
                    req.query.workspaceId
                );

            res.status(200).json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new DashboardController();