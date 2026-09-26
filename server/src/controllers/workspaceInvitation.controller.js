import workspaceInvitationService from "../services/workspaceInvitation.service.js";

class WorkspaceInvitationController {
    async createInvitation(req, res, next) {
        try {
            const invitation =
                await workspaceInvitationService.createInvitation(
                    req.params.workspaceId,
                    req.user.id,
                    req.body.email,
                    req.body.role
                );


            res.status(201).json({
                success: true,
                message: "Invitation created successfully.",
                data: invitation
            });
        } catch (error) {
            next(error);
        }
    }

    async getWorkspaceInvitations(req, res, next) {
        try {
            const invitations =
                await workspaceInvitationService.getWorkspaceInvitations(
                    req.params.workspaceId,
                    req.user.id
                );

            res.status(200).json({
                success: true,
                data: invitations
            });
        } catch (error) {
            next(error);
        }
    }

    async getInvitationById(req, res, next) {
        try {
            const invitation =
                await workspaceInvitationService.getInvitationById(
                    req.params.workspaceId,
                    req.params.invitationId,
                    req.user.id
                );

            res.status(200).json({
                success: true,
                data: invitation
            });
        } catch (error) {
            next(error);
        }
    }

    async acceptInvitation(req, res, next) {
        try {
            const result =
                await workspaceInvitationService.acceptInvitation(
                    req.params.invitationId,
                    req.user.id
                );

            res.status(200).json({
                success: true,
                message: "Invitation accepted successfully.",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async rejectInvitation(req, res, next) {
        try {
            const result =
                await workspaceInvitationService.rejectInvitation(
                    req.params.invitationId,
                    req.user.id
                );

            res.status(200).json({
                success: true,
                message: "Invitation rejected successfully.",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async cancelInvitation(req, res, next) {
        try {
            const result =
                await workspaceInvitationService.cancelInvitation(
                    req.params.workspaceId,
                    req.params.invitationId,
                    req.user.id
                );

            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            next(error);
        }
    }


}

export default new WorkspaceInvitationController();
