import { Router } from "express";
import workspaceInvitationController from "../controllers/workspaceInvitation.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/workspaces/:workspaceId/invitations",
    authenticate,
    workspaceInvitationController.createInvitation
);

router.get(
    "/workspaces/:workspaceId/invitations",
    authenticate,
    workspaceInvitationController.getWorkspaceInvitations
);

router.get(
    "/workspaces/:workspaceId/invitations/:invitationId",
    authenticate,
    workspaceInvitationController.getInvitationById
);

router.patch(
    "/invitations/:invitationId/accept",
    authenticate,
    workspaceInvitationController.acceptInvitation
);

router.patch(
    "/invitations/:invitationId/reject",
    authenticate,
    workspaceInvitationController.rejectInvitation
);

router.delete(
    "/workspaces/:workspaceId/invitations/:invitationId",
    authenticate,
    workspaceInvitationController.cancelInvitation
);

export default router;
