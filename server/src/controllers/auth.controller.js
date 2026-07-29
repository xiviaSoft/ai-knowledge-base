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
    async login(req, res, next) {

        try {

            const result =
                await authService.login(req.body);

            return res.status(200).json({
                success: true,
                ...result
            });

        } catch (error) {

            next(error);

        }

    }

    async me(req, res, next) {

        try {

            const user = await authService.getCurrentUser(
                req.user.id
            );

            return res.status(200).json({
                success: true,
                user
            });

        } catch (error) {

            next(error);

        }

    }

    async refresh(req, res, next) {

        try {

            const { refreshToken } = req.body;

            const result =
                await authService.refreshToken(refreshToken);

            return res.status(200).json({
                success: true,
                ...result
            });

        } catch (error) {

            next(error);

        }

    }

    async logout(req, res, next) {

        try {

            const result =
                await authService.logout(req.body.refreshToken);

            return res.status(200).json({
                success: true,
                ...result
            });

        } catch (error) {

            next(error);

        }

    }

}

export default new AuthController();