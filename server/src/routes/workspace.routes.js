import express from "express";
import workspaceController from "../controllers/workspace.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../validators/workspace.validator.js";
import { validate } from "../middleware/validate.middleware.js";

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
    workspaceController.getById
);
router.patch(
    "/:id",
    authenticate,
    validate(updateWorkspaceSchema),
    workspaceController.update
);

router.delete(
    "/:id",
    authenticate,
    workspaceController.delete
);

export default router;