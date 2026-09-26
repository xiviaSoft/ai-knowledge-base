import userService from "../services/user.service.js";

class UserController {
    async searchUsers(req, res, next) {
        try {
            const users = await userService.searchUsers(
                req.query.query,
                req.params.workspaceId,
                req.user.id
            );

            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            next(error);
        }

    }

}
export default new UserController();