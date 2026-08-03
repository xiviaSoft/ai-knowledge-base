import express from "express";
import workspaceController from "../controllers/workspace.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../validators/workspace.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    validate(createWorkspaceSchema),
    workspaceController.create
);

router.get(
    "/",
    authenticate,
    workspaceController.getAll
);

router.get(
    "/:id",
    authenticate,
    authorize("OWNER", "ADMIN", "EDITOR", "VIEWER"),
    workspaceController.getWorkspace
);

router.patch(
    "/:id",
    authenticate,
    authorize("OWNER"),
    workspaceController.updateWorkspace
);

router.delete(
    "/:id",
    authenticate,
    authorize("OWNER"),
    workspaceController.deleteWorkspace
);
export default router;