import workspaceMemberRepository from "../repositories/workspaceMember.repository.js";
import { v4 as uuid } from "uuid";
import ApiError from "../utils/apiErrors.js";

class WorkspaceMemberService {

    async getMembers(workspaceId) {

        return workspaceMemberRepository.findAll(workspaceId);

    }

    async inviteMember(workspaceId, email, role) {

        const user =
            await workspaceMemberRepository.findUserByEmail(email);

        if (!user) {

            throw new ApiError(404, "User not found.");

        }



        const existing =
            await workspaceMemberRepository.findMember(
                workspaceId,
                user.id
            );

        if (existing) {

            throw new ApiError(
                409,
                "User is already a workspace member."
            );

        }

        return workspaceMemberRepository.create({

            id: uuid(),

            workspace_id: workspaceId,

            user_id: user.id,

            role

        });

    }

    async updateRole(memberId, role) {
        const member = workspaceMemberRepository.findById(memberId);

        if (!member) {
            throw new ApiError(404, "Member not found.");
        }
        const roles = ["ADMIN", "EDITOR", "VIEWER"];

        if (role === "OWNER") {
            throw new ApiError(400, "Cannot assign OWNER role.");
        }

        if (!roles.includes(role)) {

            throw new ApiError(400, "Invalid role.");

        }

        return workspaceMemberRepository.updateRole(

            memberId,

            role

        );

    }

    async removeMember(memberId) {

        const member =
            await workspaceMemberRepository.findById(memberId);

        if (!member) {

            throw new Error("Workspace member not found.");

        }

        if (member.role === "OWNER") {

            throw new Error("Owner cannot be removed.");

        }

        await workspaceMemberRepository.delete(memberId);

        return {

            message: "Member removed successfully."

        };

    }

}

export default new WorkspaceMemberService();