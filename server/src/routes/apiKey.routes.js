import { Router } from "express";
import apiKeyController from "../controllers/apiKey.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import apiKeyAuth from "../middlewares/apiKey.middleware.js";

const router = Router();

router.post(
    "/:id/api-keys",
    authenticate,
    authorize("OWNER"),
    apiKeyController.create
);

router.get(
    "/:id/api-keys",
    authenticate,
    authorize("OWNER"),
    apiKeyController.getAll
);

router.delete(
    "/:id/api-keys/:keyId",
    authenticate,
    authorize("OWNER"),
    apiKeyController.delete
);

router.get(

    "/test",

    apiKeyAuth,

    (req, res) => {

        res.json({

            success: true,

            message: "API Key authentication successful.",

            workspace: req.apiKey.workspace_id

        });

    }

);
export default router;