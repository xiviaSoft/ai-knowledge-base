import workspaceMemberService from "../services/workspaceMember.service.js";

class WorkspaceMemberController {

    async getMembers(req, res, next) {

        try {

            const data =
                await workspaceMemberService.getMembers(
                    req.params.id
                );

            res.status(200).json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

    async inviteMember(req, res, next) {

        try {

            const member =
                await workspaceMemberService.inviteMember(

                    req.params.id,

                    req.body.email,

                    req.body.role

                );

            res.status(201).json({

                success: true,

                message: "Member invited successfully.",

                data: member

            });

        }

        catch (error) {

            next(error);

        }

    }

    async updateRole(req, res, next) {

        try {

            const member =
                await workspaceMemberService.updateRole(

                    req.params.memberId,

                    req.body.role

                );
            console.log(req.params)
            res.status(200).json({

                success: true,

                message: "Member role updated successfully.",

                data: member

            });

        }

        catch (error) {

            next(error);

        }

    }
    async removeMember(req, res, next) {

        try {

            const data =
                await workspaceMemberService.removeMember(

                    req.params.memberId

                );

            res.status(200).json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new WorkspaceMemberController();