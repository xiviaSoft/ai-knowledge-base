"use client";

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import { WorkspaceMember } from "@/app/services/workspaceMember.service";

interface RemoveMemberDialogProps {
    open: boolean;
    member: WorkspaceMember | null;
    loading: boolean;
    error?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function RemoveMemberDialog({
    open,
    member,
    loading,
    error,
    onClose,
    onConfirm
}: RemoveMemberDialogProps) {

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
                <PersonRemoveRoundedIcon color="error" />
                Remove Member
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
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    Are you sure you want to remove this member
                    from the workspace?
                </Typography>

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
                >
                    {user.email}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    This member will immediately lose access
                    to this workspace.
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
                    color="error"
                    onClick={onConfirm}
                    loading={loading}
                >
                    Remove Member
                </Button>
            </DialogActions>
        </Dialog>
    );
}
