import userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get(
    "/search",
    authenticate,
    userController.searchUsers
);

export default router;