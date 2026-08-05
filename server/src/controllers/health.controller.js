import { env } from "../config/env.js";

class HealthController {

    async check(req, res) {

        res.status(200).json({

            success: true,

            status: "OK",

            timestamp: new Date(),

            uptime: process.uptime(),

            environment: env.NODE_ENV

        });

    }

}

export default new HealthController();