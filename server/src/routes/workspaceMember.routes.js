import { Router } from "express";
import workspaceMemberController from "../controllers/workspaceMember.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
    "/:id/members",
    authenticate,
    workspaceMemberController.getMembers
);

router.post(
    "/:id/members",
    authenticate,
    authorize("OWNER"),
    workspaceMemberController.inviteMember
);
router.patch(
    "/:workspaceId/members/:memberId",
    authenticate,
    authorize("OWNER"),
    workspaceMemberController.updateRole
);
router.delete(
    "/:workspaceId/members/:memberId",
    authenticate,
    authorize("OWNER", "ADMIN"),
    workspaceMemberController.removeMember
);
export default router;