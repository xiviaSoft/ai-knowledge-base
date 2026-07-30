import express from "express";
import chatController from "../controllers/chat.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(

    "/ask",

    authenticate,

    chatController.ask

);

export default router;