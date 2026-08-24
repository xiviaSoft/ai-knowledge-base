"use client";

import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import {
    Alert,
    Box,
    Button,
    Container,
    Snackbar,
    Typography
} from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import InviteMemberDialog from "@/app/components/members/InviteMemberDialog";
import RemoveMemberDialog from "@/app/components/members/RemoveMemberDialog";
import ChangeRoleDialog from "@/app/components/members/ChangeRoleDialog";
import MemberTable from "@/app/components/members/MemberTable";
import useWorkspaceMembers from "@/app/hooks/useWorkspaceMembers";
import {
    InviteMemberPayload,
    WorkspaceMember,
    WorkspaceMemberRole
} from "@/app/services/workspaceMember.service";
import {
    canInviteMembers,
    canManageMemberRoles,
    canRemoveMembers
} from "@/app/utils/workspacePermissions";

export default function MembersPage() {
    const params = useParams();

    const workspaceId =
        params.workspaceId as string;

    const [inviteOpen, setInviteOpen] =
        useState(false);

    const [selectedMember, setSelectedMember] =
        useState<WorkspaceMember | null>(null);

    const [roleMember, setRoleMember] =
        useState<WorkspaceMember | null>(null);

    const [snackbar, setSnackbar] =
        useState<{
            open: boolean;
            message: string;
            severity: "success" | "error";
        }>({
            open: false,
            message: "",
            severity: "success"
        });

    const {
        members,
        loading,
        actionLoading,
        error,
        currentUserRole,
        inviteMember,
        updateRole,
        removeMember
    } = useWorkspaceMembers(
        workspaceId
    );

    const canInvite =
        canInviteMembers(
            currentUserRole
        );

    const canManageRoles =
        canManageMemberRoles(
            currentUserRole
        );

    const canRemove =
        canRemoveMembers(
            currentUserRole
        );

    const showSnackbar = (
        message: string,
        severity: "success" | "error"
    ) => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleRemove = (
        member: WorkspaceMember
    ) => {
        setSelectedMember(member);
    };

    const handleRoleChange = (
        memberId: string,
        role: Exclude<
            WorkspaceMemberRole,
            "OWNER"
        >
    ) => {
        const member = members.find(
            (member) =>
                member.id === memberId
        );

        if (!member) {
            return;
        }

        setRoleMember(member);
    };

    const handleInviteMember = async (
        payload: InviteMemberPayload
    ): Promise<void> => {
        try {
            await inviteMember(payload);

            showSnackbar(
                "Member invitation sent successfully.",
                "success"
            );
        } catch (error) {
            console.error(
                "Failed to invite member:",
                error
            );

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to invite member.";

            showSnackbar(
                message,
                "error"
            );

            throw error;
        }
    };

    const handleConfirmRemove = async () => {
        if (!selectedMember) {
            return;
        }

        try {
            await removeMember(
                selectedMember.id
            );

            setSelectedMember(null);

            showSnackbar(
                "Member removed successfully.",
                "success"
            );
        } catch (error) {
            console.error(
                "Failed to remove member:",
                error
            );

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to remove member.";

            showSnackbar(
                message,
                "error"
            );
        }
    };

    const handleConfirmRoleChange = async (
        role: Exclude<
            WorkspaceMemberRole,
            "OWNER"
        >
    ) => {
        if (!roleMember) {
            return;
        }

        try {
            await updateRole(
                roleMember.id,
                role
            );

            setRoleMember(null);

            showSnackbar(
                "Member role updated successfully.",
                "success"
            );
        } catch (error) {
            console.error(
                "Failed to update member role:",
                error
            );

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update member role.";

            showSnackbar(
                message,
                "error"
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100%",
                backgroundColor: "#F6F8FC",
                py: 4
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center"
                        },
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 4,
                        flexDirection: {
                            xs: "column",
                            sm: "row"
                        }
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            Members
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 0.5
                            }}
                        >
                            Manage members and their workspace roles.
                        </Typography>
                    </Box>

                    {canInvite && (
                        <Button
                            variant="contained"
                            startIcon={
                                <PersonAddAltRoundedIcon />
                            }
                            onClick={() =>
                                setInviteOpen(true)
                            }
                        >
                            Invite Member
                        </Button>
                    )}
                </Box>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 3
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <MemberTable
                    members={members}
                    loading={loading}
                    actionLoading={actionLoading}
                    canManageRoles={canManageRoles}
                    canRemoveMembers={canRemove}
                    onRoleChange={handleRoleChange}
                    onRemove={handleRemove}
                />

                <RemoveMemberDialog
                    open={
                        Boolean(
                            selectedMember
                        )
                    }
                    member={
                        selectedMember
                    }
                    loading={
                        actionLoading
                    }
                    error={
                        error
                    }
                    onClose={() =>
                        setSelectedMember(
                            null
                        )
                    }
                    onConfirm={
                        handleConfirmRemove
                    }
                />

                <ChangeRoleDialog
                    open={
                        Boolean(
                            roleMember
                        )
                    }
                    member={
                        roleMember
                    }
                    loading={
                        actionLoading
                    }
                    error={
                        error
                    }
                    onClose={() =>
                        setRoleMember(
                            null
                        )
                    }
                    onConfirm={
                        handleConfirmRoleChange
                    }
                />

                {canInvite && (
                    <InviteMemberDialog
                        open={
                            inviteOpen
                        }
                        loading={
                            actionLoading
                        }
                        error={
                            error
                        }
                        onClose={() =>
                            setInviteOpen(
                                false
                            )
                        }
                        onSubmit={
                            handleInviteMember
                        }
                    />
                )}

                <Snackbar
                    open={
                        snackbar.open
                    }
                    autoHideDuration={4000}
                    onClose={() =>
                        setSnackbar(
                            (previous) => ({
                                ...previous,
                                open: false
                            })
                        )
                    }
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                >
                    <Alert
                        severity={
                            snackbar.severity
                        }
                        variant="filled"
                        onClose={() =>
                            setSnackbar(
                                (previous) => ({
                                    ...previous,
                                    open: false
                                })
                            )
                        }
                        sx={{
                            width: "100%"
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}