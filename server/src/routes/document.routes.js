import express from "express";

import documentController from "../controllers/document.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import authorize from "../middlewares/authorize.middleware.js";

import upload from "../config/multer.js";

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

    documentController.upload
);
router.get(
    "/",
    authenticate,
    documentController.getDocuments
);


router.get(
    "/workspace/:workspaceId",
    authenticate,
    documentController.getDocumentsByWorkspace
);


router.delete(
    "/:id",
    authenticate,
    documentController.deleteDocument
);


export default router;