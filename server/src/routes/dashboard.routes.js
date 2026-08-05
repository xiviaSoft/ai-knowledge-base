import { Router } from "express";
import dashboardController from "../controllers/dashboard.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
    "/overview",
    authenticate,
    dashboardController.getOverview
);
router.get(
    "/:id/dashboard",
    authenticate,
    authorize("OWNER", "ADMIN", "EDITOR", "VIEWER"),
    dashboardController.getDashboard
);
export default router;