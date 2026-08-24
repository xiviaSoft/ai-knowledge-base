import workspaceService from "../services/workspace.service.js";

class WorkspaceController {
    async create(req, res, next) {
        try {
            const result =
                await workspaceService.createWorkspace(
                    req.user.id,
                    req.body
                );

            return res.status(201).json({
                success: true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const result =
                await workspaceService.getUserWorkspaces(
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }

    async getWorkspace(req, res, next) {
        try {
            const data =
                await workspaceService.getWorkspace(
                    req.params.id,
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async updateWorkspace(req, res, next) {
        try {
            const result =
                await workspaceService.updateWorkspace(
                    req.params.id,
                    req.user.id,
                    req.body
                );

            return res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }



    async deleteWorkspace(req, res, next) {
        try {
            const result =
                await workspaceService.deleteWorkspace(
                    req.params.id,
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }

    async getRecentActivity(req, res, next) {
        try {
            const data =
                await workspaceService.getRecentActivity(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async getDashboard(req, res, next) {
        try {
            const data =
                await workspaceService.getDashboard(
                    req.params.workspaceId,
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new WorkspaceController();