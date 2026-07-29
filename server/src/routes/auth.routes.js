import { registerSchema } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import authController from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

export default router;