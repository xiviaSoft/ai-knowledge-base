"use client";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { WorkspaceMember } from "@/app/services/workspaceMember.service";
interface RemoveMemberDialogProps {
    open: boolean;
    member?: WorkspaceMember | null;
    loading?: boolean;
    error?: string;
    onClose: () => void;
    onConfirm: () => void;
}
export default function RemoveMemberDialog({
    open,
    member,
    loading = false,
    error = "",
    onClose,
    onConfirm
}: RemoveMemberDialogProps) {
    const fullName = member
        ? `${member.users.first_name || ""} ${member.users.last_name || ""}`.trim()
        : "this member";
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle
                sx={{
                    fontWeight: 700
                }}
            >
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
                <Typography>
                    Are you sure you want to remove{" "}
                    <strong>{fullName}</strong> from
                    this workspace?
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    This member will lose access to the
                    workspace and its resources.
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
                    startIcon={
                        <DeleteOutlineRoundedIcon />
                    }
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading
                        ? "Removing..."
                        : "Remove Member"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}