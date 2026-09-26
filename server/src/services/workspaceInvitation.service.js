import workspaceInvitationRepository from "../repositories/workspaceInvitation.repository.js";
import workspaceMemberRepository from "../repositories/workspaceMember.repository.js";
import workspaceRepository from "../repositories/workspace.repository.js";
import prisma from "../config/prisma.js";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import ApiError from "../utils/apiErrors.js";

class WorkspaceInvitationService {
    async createInvitation(
        workspaceId,
        inviterId,
        email,
        role
    ) {
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

        if (workspace.owner_id !== inviterId) {
            throw new ApiError(
                403,
                "Only the workspace owner can invite members."
            );
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const user =
            await workspaceMemberRepository.findUserByEmail(
                normalizedEmail
            );

        if (!user) {
            throw new ApiError(
                404,
                "User not found. The user must have an account before being invited."
            );
        }

        if (user.id === workspace.owner_id) {
            throw new ApiError(
                400,
                "The workspace owner is already a member."
            );
        }

        const existingMember =
            await workspaceMemberRepository.findMember(
                workspaceId,
                user.id
            );

        if (existingMember) {
            throw new ApiError(
                409,
                "User is already a workspace member."
            );
        }

        const existingInvitation =
            await workspaceInvitationRepository.findPendingByUser(
                workspaceId,
                user.id
            );

        if (existingInvitation) {
            throw new ApiError(
                409,
                "A pending invitation already exists for this user."
            );
        }

        const token = crypto
            .randomBytes(32)
            .toString("hex");

        const expiresAt = new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000
        );

        const invitationId = uuid();

        const invitation =
            await prisma.$transaction(
                async (tx) => {
                    const createdInvitation =
                        await tx.workspace_invitations.create({
                            data: {
                                id: invitationId,
                                workspace_id:
                                    workspaceId,
                                inviter_id:
                                    inviterId,
                                invitee_id:
                                    user.id,
                                email:
                                    normalizedEmail,
                                role,
                                token,
                                status:
                                    "PENDING",
                                expires_at:
                                    expiresAt
                            }
                        });

                    await tx.notifications.create({
                        data: {
                            id: uuid(),
                            user_id: user.id,
                            workspace_id:
                                workspaceId,
                            invitation_id:
                                invitationId,
                            type:
                                "WORKSPACE_INVITATION",
                            title:
                                "Workspace invitation",
                            message:
                                `${workspace.name} has invited you to join as ${role.toLowerCase()}.`,
                            is_read: false
                        }
                    });

                    return createdInvitation;
                }
            );

        return invitation;
    }

    async getWorkspaceInvitations(
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

        if (workspace.owner_id !== userId) {
            throw new ApiError(
                403,
                "Only the workspace owner can view invitations."
            );
        }

        return workspaceInvitationRepository.findAllByWorkspace(
            workspaceId
        );
    }

    async getInvitationById(
        workspaceId,
        invitationId,
        userId
    ) {
        const invitation =
            await workspaceInvitationRepository.findById(
                invitationId
            );

        if (!invitation) {
            throw new ApiError(
                404,
                "Invitation not found."
            );
        }

        if (
            invitation.workspace_id !==
            workspaceId
        ) {
            throw new ApiError(
                404,
                "Invitation does not belong to this workspace."
            );
        }

        if (
            invitation.invitee_id !== userId &&
            invitation.workspaces.owner_id !== userId
        ) {
            throw new ApiError(
                403,
                "You are not authorized to view this invitation."
            );
        }

        return invitation;
    }

    async acceptInvitation(
        invitationId,
        userId
    ) {
        const invitation =
            await workspaceInvitationRepository.findById(
                invitationId
            );

        if (!invitation) {
            throw new ApiError(
                404,
                "Invitation not found."
            );
        }

        if (invitation.invitee_id !== userId) {
            throw new ApiError(
                403,
                "You are not authorized to accept this invitation."
            );
        }

        if (invitation.status !== "PENDING") {
            throw new ApiError(
                400,
                "This invitation is no longer pending."
            );
        }

        if (
            new Date(invitation.expires_at) <
            new Date()
        ) {
            await prisma.$transaction(
                async (tx) => {
                    await tx.workspace_invitations.update({
                        where: {
                            id: invitationId
                        },
                        data: {
                            status: "EXPIRED"
                        }
                    });

                    await tx.notifications.updateMany({
                        where: {
                            user_id: userId,
                            invitation_id:
                                invitationId,
                            type:
                                "WORKSPACE_INVITATION"
                        },
                        data: {
                            is_read: true
                        }
                    });
                }
            );

            throw new ApiError(
                400,
                "This invitation has expired."
            );
        }

        const existingMember =
            await workspaceMemberRepository.findMember(
                invitation.workspace_id,
                userId
            );

        if (existingMember) {
            throw new ApiError(
                409,
                "You are already a member of this workspace."
            );
        }

        const acceptedAt = new Date();

        const member =
            await prisma.$transaction(
                async (tx) => {
                    const createdMember =
                        await tx.workspace_members.create({
                            data: {
                                id: uuid(),
                                workspace_id:
                                    invitation.workspace_id,
                                user_id:
                                    userId,
                                role:
                                    invitation.role,
                                joined_at:
                                    acceptedAt
                            }
                        });

                    await tx.workspace_invitations.update({
                        where: {
                            id: invitationId
                        },
                        data: {
                            status:
                                "ACCEPTED",
                            accepted_at:
                                acceptedAt
                        }
                    });

                    await tx.notifications.updateMany({
                        where: {
                            user_id: userId,
                            invitation_id:
                                invitationId,
                            type:
                                "WORKSPACE_INVITATION"
                        },
                        data: {
                            is_read: true
                        }
                    });

                    return createdMember;
                }
            );

        return member;
    }

    async rejectInvitation(
        invitationId,
        userId
    ) {
        const invitation =
            await workspaceInvitationRepository.findById(
                invitationId
            );

        if (!invitation) {
            throw new ApiError(
                404,
                "Invitation not found."
            );
        }

        if (invitation.invitee_id !== userId) {
            throw new ApiError(
                403,
                "You are not authorized to reject this invitation."
            );
        }

        if (invitation.status !== "PENDING") {
            throw new ApiError(
                400,
                "This invitation is no longer pending."
            );
        }

        await prisma.$transaction(
            async (tx) => {
                await tx.workspace_invitations.update({
                    where: {
                        id: invitationId
                    },
                    data: {
                        status: "REJECTED"
                    }
                });

                await tx.notifications.updateMany({
                    where: {
                        user_id: userId,
                        invitation_id:
                            invitationId,
                        type:
                            "WORKSPACE_INVITATION"
                    },
                    data: {
                        is_read: true
                    }
                });
            }
        );

        return {
            message:
                "Invitation rejected successfully."
        };
    }

    async cancelInvitation(
        workspaceId,
        invitationId,
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

        if (workspace.owner_id !== userId) {
            throw new ApiError(
                403,
                "Only the workspace owner can cancel invitations."
            );
        }

        const invitation =
            await workspaceInvitationRepository.findById(
                invitationId
            );

        if (!invitation) {
            throw new ApiError(
                404,
                "Invitation not found."
            );
        }

        if (
            invitation.workspace_id !==
            workspaceId
        ) {
            throw new ApiError(
                404,
                "Invitation does not belong to this workspace."
            );
        }

        if (invitation.status !== "PENDING") {
            throw new ApiError(
                400,
                "Only pending invitations can be cancelled."
            );
        }

        await prisma.$transaction(
            async (tx) => {
                await tx.notifications.updateMany({
                    where: {
                        user_id:
                            invitation.invitee_id,
                        invitation_id:
                            invitationId,
                        type:
                            "WORKSPACE_INVITATION"
                    },
                    data: {
                        is_read: true
                    }
                });

                await tx.workspace_invitations.delete({
                    where: {
                        id: invitationId
                    }
                });
            }
        );

        return {
            message:
                "Invitation cancelled successfully."
        };
    }
}

export default new WorkspaceInvitationService();