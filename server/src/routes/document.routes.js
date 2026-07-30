import express from "express";

import upload from "../config/multer.js";

import { authenticate } from "../middleware/auth.middleware.js";

import documentController from "../controllers/document.controller.js";

const router = express.Router();

router.post(

    "/upload",

    authenticate,

    upload.single("document"),

    documentController.upload

);


export default router;