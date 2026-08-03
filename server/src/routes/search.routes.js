import { Router } from "express";
import searchController from "../controllers/search.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(

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