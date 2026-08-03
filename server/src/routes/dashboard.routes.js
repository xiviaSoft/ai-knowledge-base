import { Router } from "express";
import dashboardController from "../controllers/dashboard.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    "/overview",
    authenticate,
    dashboardController.getOverview
);

export default router;