import workspaceMemberRepository from "../repositories/workspaceMember.repository.js";
import workspaceRepository from "../repositories/workspace.repository.js";
import { v4 as uuid } from "uuid";
import ApiError from "../utils/apiErrors.js";

class WorkspaceMemberService {
    async getMembers(workspaceId, userId) {
        await this.verifyWorkspaceAccess(
            workspaceId,
            userId
        );
        return workspaceMemberRepository.findAll(workspaceId);
    }

    async inviteMember(workspaceId, email, role) {
        if (!email || !email.trim()) {
            throw new ApiError(
                400,
                "Email is required."
            );
        }

        const allowedRoles = [
            "ADMIN",
            "EDITOR",
            "VIEWER"
        ];

        if (!allowedRoles.includes(role)) {
            throw new ApiError(
                400,
                "Invalid member role."
            );
        }

        const user =
            await workspaceMemberRepository.findUserByEmail(
                email.trim().toLowerCase()
            );

        if (!user) {
            throw new ApiError(
                404,
                "User not found. The user must have an account before being added."
            );
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

        const member = await workspaceMemberRepository.create({
            id: uuid(),
            workspace_id: workspaceId,
            user_id: user.id,
            role
        });

        await notificationService.create({
            userId: user.id,
            workspaceId,
            type: "MEMBER_ADDED",
            title: "Added to workspace",
            message: `You were added to a workspace as ${role}.`
        });

        return member;
    }

    async updateRole(
        workspaceId,
        memberId,
        role
    ) {
        const member =
            await workspaceMemberRepository.findMemberById(
                memberId
            );

        if (!member) {
            throw new ApiError(
                404,
                "Member not found."
            );
        }

        if (
            member.workspace_id !==
            workspaceId
        ) {
            throw new ApiError(
                404,
                "Member does not belong to this workspace."
            );
        }

        if (member.role === "OWNER") {
            throw new ApiError(
                400,
                "The workspace owner role cannot be changed."
            );
        }

        const allowedRoles = [
            "ADMIN",
            "EDITOR",
            "VIEWER"
        ];

        if (!allowedRoles.includes(role)) {
            throw new ApiError(
                400,
                "Invalid role."
            );
        }

        return workspaceMemberRepository.updateRole(
            memberId,
            role
        );
    }

    async removeMember(
        workspaceId,
        memberId
    ) {
        const member =
            await workspaceMemberRepository.findMemberById(
                memberId
            );

        if (!member) {
            throw new ApiError(
                404,
                "Member not found."
            );
        }

        if (
            member.workspace_id !==
            workspaceId
        ) {
            throw new ApiError(
                404,
                "Member does not belong to this workspace."
            );
        }

        if (member.role === "OWNER") {
            throw new ApiError(
                400,
                "The workspace owner cannot be removed."
            );
        }

        await workspaceMemberRepository.delete(
            memberId
        );

        return {
            message:
                "Member removed successfully."
        };
    }

    async verifyWorkspaceAccess(
        workspaceId,
        userId
    ) {
        const workspace =
            await workspaceRepository.findById(
                workspaceId
            );

        if (!workspace) {
            throw new ApiError(
                404,
                "Workspace not found."
            );
        }

        if (
            workspace.owner_id ===
            userId
        ) {
            return workspace;
        }

        const member =
            await workspaceMemberRepository.findMember(
                workspaceId,
                userId
            );

        if (!member) {
            throw new ApiError(
                403,
                "You are not a member of this workspace."
            );
        }

        return workspace;
    }

    async getMember(
        workspaceId,
        memberId,
        userId
    ) {
        await this.verifyWorkspaceAccess(
            workspaceId,
            userId
        );

        const member =
            await workspaceMemberRepository.findMemberById(
                memberId
            );

        if (!member) {
            throw new ApiError(
                404,
                "Member not found."
            );
        }

        if (
            member.workspace_id !==
            workspaceId
        ) {
            throw new ApiError(
                404,
                "Member does not belong to this workspace."
            );
        }

        return member;
    }
}

export default new WorkspaceMemberService();