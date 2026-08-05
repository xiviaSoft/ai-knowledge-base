import { Router } from "express";
import chatController from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();

router.post("/ask", authenticate, authorize(
    "OWNER",
    "ADMIN",
    "EDITOR",
    "VIEWER"
), chatController.ask);

router.get(
    "/conversations",
    authenticate,
    chatController.getConversations
);

router.get(
    "/conversations/:id",
    authenticate,
    chatController.getConversation
);

router.delete(
    "/conversations/:id",
    authenticate,
    chatController.deleteConversation
);
router.get(
    "/search",
    authenticate,
    chatController.search
);
router.get(
    "/global-search",
    authenticate,
    chatController.globalSearch
);

export default router;