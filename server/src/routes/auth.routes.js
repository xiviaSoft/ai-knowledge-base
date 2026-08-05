import { loginSchema, logoutSchema, refreshSchema, registerSchema } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Sayed
 *               last_name:
 *                 type: string
 *                 example: Bilal
 *               email:
 *                 type: string
 *                 example: bilal@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: bilal@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
    "/login",
    validate(loginSchema),
    authController.login
);
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get logged in user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/me",
    authenticate,
    authController.me
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid refresh token
 */

router.post(
    "/refresh",
    validate(refreshSchema),
    authController.refresh
);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/logout",
    validate(logoutSchema),
    authController.logout
);

export default router;