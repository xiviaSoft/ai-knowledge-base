import { authorizeWorkspace } from "../middlewares/workspace.middleware.js";
import documentController from "../controllers/document.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import upload from "../config/multer.js";
import express from "express";
const router = express.Router();
router.post(
    "/upload",
    authenticate,
    upload.single("file"),
    authorize(
        "OWNER",
        "ADMIN",
        "EDITOR"
    ),
    authorizeWorkspace,
    documentController.upload
);
router.post(
    "/:id/retry",
    authenticate,
    authorize(
        "OWNER",
        "ADMIN",
        "EDITOR"
    ),
    documentController.retryDocument
);
router.get(
    "/:id",
    authenticate,
    documentController.getDocument
);
router.post(
    "/:id/sync",
    authenticate,
    documentController.syncDocument
);
router.get(
    "/",
    authenticate,
    authorizeWorkspace,
    documentController.getDocuments
);
router.get(
    "/workspace/:workspaceId",
    authenticate,
    authorizeWorkspace,
    documentController.getDocumentsByWorkspace
);
router.delete(
    "/:id",
    authenticate,
    documentController.deleteDocument
);
export default router;