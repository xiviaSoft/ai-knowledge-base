import searchController from "../controllers/search.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    authenticate,
    authorize(
        "OWNER",
        "ADMIN",
        "EDITOR",
        "VIEWER"
    ),
    searchController.search
);

export default router;
