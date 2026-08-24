import workspaceRepository from "../repositories/workspace.repository.js";
export async function authorizeWorkspace(req, res, next) {
    try {
        const userId = req.user?.id;
        const workspaceId =
            req.params.workspaceId ||
            req.body?.workspaceId ||
            req.query?.workspaceId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }
        if (!workspaceId) {
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required."
            });
        }
        const workspace =
            await workspaceRepository.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found."
            });
        }
        if (workspace.owner_id === userId) {
            req.workspace = workspace;
            req.workspaceRole = "OWNER";
            return next();
        }
        const member =
            await workspaceRepository.findMember(
                workspaceId,
                userId
            );
        if (!member) {
            return res.status(403).json({
                success: false,
                message: "You do not have access to this workspace."
            });
        }
        req.workspace = workspace;
        req.workspaceRole = member.role;
        req.workspaceMember = member;
        next();
    } catch (error) {
        next(error);
    }
}