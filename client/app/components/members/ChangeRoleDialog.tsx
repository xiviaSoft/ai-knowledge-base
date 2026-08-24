"use client";

import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {
    WorkspaceMember,
    WorkspaceMemberRole
} from "@/app/services/workspaceMember.service";
import { useEffect, useState } from "react";

interface ChangeRoleDialogProps {
    open: boolean;
    member: WorkspaceMember | null;
    loading: boolean;
    error?: string;
    onClose: () => void;
    onConfirm: (
        role: Exclude<WorkspaceMemberRole, "OWNER">
    ) => void;
}

export default function ChangeRoleDialog({
    open,
    member,
    loading,
    error,
    onClose,
    onConfirm
}: ChangeRoleDialogProps) {

    const [role, setRole] =
        useState<Exclude<WorkspaceMemberRole, "OWNER">>("VIEWER");

    useEffect(() => {

        if (!member) {
            return;
        }

        if (member.role !== "OWNER") {
            setRole(member.role);
        }

    }, [member]);

    if (!member) {
        return null;
    }

    const user = member.users;

    const name =
        `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
        user.email;

    return (
        <Dialog
            open={open}
            onClose={
                loading
                    ? undefined
                    : onClose
            }
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 700
                }}
            >
                <ManageAccountsRoundedIcon />
                Change Member Role
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                <Typography
                    sx={{
                        fontWeight: 700
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    {user.email}
                </Typography>

                <FormControl
                    fullWidth
                >
                    <InputLabel>
                        Workspace Role
                    </InputLabel>

                    <Select
                        value={role}
                        label="Workspace Role"
                        onChange={(event) =>
                            setRole(
                                event.target.value as Exclude<
                                    WorkspaceMemberRole,
                                    "OWNER"
                                >
                            )
                        }
                        disabled={loading}
                    >
                        <MenuItem value="ADMIN">
                            Admin
                        </MenuItem>

                        <MenuItem value="EDITOR">
                            Editor
                        </MenuItem>

                        <MenuItem value="VIEWER">
                            Viewer
                        </MenuItem>
                    </Select>
                </FormControl>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    Changing the role will immediately change
                    this member's permissions in the workspace.
                </Typography>
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 2
                }}
            >
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={() =>
                        onConfirm(role)
                    }
                    disabled={
                        loading ||
                        role === member.role
                    }
                    loading={loading}
                >
                    Change Role
                </Button>
            </DialogActions>
        </Dialog>
    );
}
