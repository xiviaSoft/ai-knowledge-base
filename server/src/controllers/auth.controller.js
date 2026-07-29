import authService from "../services/auth.service.js";

class AuthController {

    async register(req, res, next) {

        try {

            const result =
                await authService.register(req.body);

            return res.status(201).json({
                success: true,
                ...result,
            });

        } catch (error) {
            next(error);
        }

    }

}

export default new AuthController();