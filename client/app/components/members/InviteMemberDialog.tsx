"use client";
import { useEffect, useState } from "react";
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
    TextField
} from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import {
    InviteMemberPayload,
    WorkspaceMemberRole
} from "@/app/services/workspaceMember.service";

interface InviteMemberDialogProps {
    open: boolean;
    loading?: boolean;
    error?: string;
    onClose: () => void;
    onSubmit: (
        payload: InviteMemberPayload
    ) => Promise<void>;
}

const roles: Exclude<
    WorkspaceMemberRole,
    "OWNER"
>[] = [
    "ADMIN",
    "EDITOR",
    "VIEWER"
];

export default function InviteMemberDialog({
    open,
    loading = false,
    error = "",
    onClose,
    onSubmit
}: InviteMemberDialogProps) {
    const [email, setEmail] = useState("");
    const [role, setRole] =
        useState<Exclude<
            WorkspaceMemberRole,
            "OWNER"
        >>("VIEWER");
    const [validationError, setValidationError] =
        useState("");

    useEffect(() => {
        if (!open) {
            setEmail("");
            setRole("VIEWER");
            setValidationError("");
        }
    }, [open]);

    const handleSubmit = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setValidationError(
                "Email address is required."
            );
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(trimmedEmail)) {
            setValidationError(
                "Please enter a valid email address."
            );
            return;
        }

        setValidationError("");

        try {
            await onSubmit({
                email: trimmedEmail,
                role
            });
            onClose();
        } catch {
        }
    };

    const handleClose = () => {
        if (loading) {
            return;
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 700
                }}
            >
                <PersonAddAltRoundedIcon />
                Invite Member
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
                {validationError && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {validationError}
                    </Alert>
                )}
                <TextField
                    autoFocus
                    fullWidth
                    label="Email address"
                    type="email"
                    value={email}
                    disabled={loading}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setValidationError("");
                    }}
                    sx={{ mt: 1 }}
                    placeholder="member@example.com"
                />
                <FormControl
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    <InputLabel>
                        Role
                    </InputLabel>
                    <Select
                        value={role}
                        label="Role"
                        onChange={(event) =>
                            setRole(
                                event.target
                                    .value as Exclude<
                                    WorkspaceMemberRole,
                                    "OWNER"
                                >
                            )
                        }
                    >
                        {roles.map((item) => (
                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions
                sx={{
                    px: 3,
                    pb: 2
                }}
            >
                <Button
                    onClick={handleClose}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={
                        <PersonAddAltRoundedIcon />
                    }
                >
                    {loading
                        ? "Inviting..."
                        : "Invite Member"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
