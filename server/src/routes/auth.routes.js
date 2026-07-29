import { loginSchema, logoutSchema, refreshSchema, registerSchema } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import authController from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

router.get(
    "/me",
    authenticate,
    authController.me
);

router.post(
    "/refresh",
    validate(refreshSchema),
    authController.refresh
);

router.post(
    "/logout",
    validate(logoutSchema),
    authController.logout
);

export default router;