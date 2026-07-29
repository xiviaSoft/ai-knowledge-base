export const authorize = (...roles) => {

    return async (req, res, next) => {

        const member = req.workspaceMember;

        if (!member) {
            return res.status(403).json({
                success: false,
                message: "Workspace membership required."
            });
        }

        if (!roles.includes(member.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action."
            });
        }

        next();

    };

};