import prisma from "../config/prisma.js";

const authorize = (...allowedRoles) => {

    return async (req, res, next) => {

        try {

            const workspaceId =
                req.params.workspaceId ||
                req.params.id ||
                req.body.workspaceId ||
                req.query.workspaceId;

            if (!workspaceId) {

                return res.status(400).json({

                    success: false,

                    message: "Workspace ID is required."

                });

            }

            const member =
                await prisma.workspace_members.findFirst({

                    where: {

                        workspace_id: workspaceId,

                        user_id: req.user.id

                    }

                });

            if (!member) {

                return res.status(403).json({

                    success: false,

                    message: "You are not a member of this workspace."

                });

            }

            if (!allowedRoles.includes(member.role)) {

                return res.status(403).json({

                    success: false,

                    message: "You don't have permission to perform this action."

                });

            }

            req.member = member;

            next();

        }

        catch (error) {

            next(error);

        }

    };

};

export default authorize;
