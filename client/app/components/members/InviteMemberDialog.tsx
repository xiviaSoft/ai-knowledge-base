"use client";

import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useState } from "react";
import useUserSearch, {
    WorkspaceUser
} from "@/app/hooks/useUserSearch";
import invitationService from "@/app/services/invitation.service";

interface InviteMemberDialogProps {
    open: boolean;
    workspaceId: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function InviteMemberDialog({
    open,
    workspaceId,
    onClose,
    onSuccess
}: InviteMemberDialogProps) {
    const {
        query,
        setQuery,
        users,
        loading,
        error,
        clearSearch
    } = useUserSearch(workspaceId);


    const [selectedUser, setSelectedUser] =
        useState<WorkspaceUser | null>(null);

    const [role, setRole] = useState("EDITOR");
    const [inviting, setInviting] = useState(false);
    const [inviteError, setInviteError] =
        useState<string | null>(null);

    const handleClose = () => {
        if (inviting) {
            return;
        }

        clearSearch();
        setSelectedUser(null);
        setRole("EDITOR");
        setInviteError(null);
        onClose();
    };

    const handleSelectUser = (
        user: WorkspaceUser
    ) => {
        setSelectedUser(user);
        setQuery(
            `${user.first_name} ${user.last_name}`
        );
    };

    const handleInvite = async () => {
        if (!selectedUser) {
            setInviteError(
                "Please select a user."
            );
            return;
        }

        try {
            setInviting(true);
            setInviteError(null);

            const res = await invitationService.createInvitation(
                workspaceId,
                selectedUser.email,
                role
            );
            console.log(res)
            onSuccess?.();
            handleClose();
        } catch (error: any) {
            setInviteError(
                error?.response?.data?.message ||
                "Failed to send invitation."
            );
        } finally {
            setInviting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Invite Member
            </DialogTitle>

            <DialogContent>
                <Typography
                    color="text.secondary"
                    sx={{ mb: 2, fontSize: 14 }}
                >
                    Search for an existing user and
                    invite them to this workspace.
                </Typography>

                <Paper
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 1.5,
                        py: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        boxShadow: "none"
                    }}
                >
                    <SearchRoundedIcon
                        color="action"
                    />

                    <InputBase
                        value={query}
                        onChange={(event) => {
                            setQuery(
                                event.target.value
                            );
                            setSelectedUser(null);
                        }}
                        placeholder="Search name or email..."
                        sx={{
                            ml: 1,
                            flex: 1
                        }}
                    />
                </Paper>

                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 3
                        }}
                    >
                        <CircularProgress size={24} />
                    </Box>
                )}

                {!loading &&
                    query.trim() &&
                    !selectedUser &&
                    users.length > 0 && (
                        <Paper
                            sx={{
                                mt: 1,
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "none",
                                maxHeight: 260,
                                overflowY: "auto"
                            }}
                        >
                            {users.map((user) => (
                                <Box
                                    key={user.id}
                                    onClick={() =>
                                        handleSelectUser(
                                            user
                                        )
                                    }
                                    sx={{
                                        display: "flex",
                                        alignItems:
                                            "center",
                                        gap: 1.5,
                                        px: 1.5,
                                        py: 1.25,
                                        cursor: "pointer",
                                        "&:hover": {
                                            bgcolor:
                                                "action.hover"
                                        }
                                    }}
                                >
                                    <Avatar
                                        src={
                                            user.avatar ||
                                            undefined
                                        }
                                        sx={{
                                            width: 38,
                                            height: 38
                                        }}
                                    >
                                        {user.first_name?.charAt(
                                            0
                                        )}
                                    </Avatar>

                                    <Box
                                        sx={{
                                            minWidth: 0,
                                            flex: 1
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 14
                                            }}
                                        >
                                            {
                                                user.first_name
                                            }{" "}
                                            {
                                                user.last_name
                                            }
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            sx={{ fontSize: 12 }}
                                        >
                                            {
                                                user.email
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Paper>
                    )}

                {!loading &&
                    query.trim() &&
                    !selectedUser &&
                    users.length === 0 &&
                    !error && (
                        <Typography
                            color="text.secondary"
                            sx={{
                                py: 2,
                                textAlign: "center",
                                fontSize: 13
                            }}
                        >
                            No users found.
                        </Typography>
                    )}

                {error && (
                    <Typography
                        color="error"
                        sx={{ mt: 1, fontSize: 13 }}
                    >
                        {error}
                    </Typography>
                )}

                {selectedUser && (
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            sx={{
                                mb: 1,
                                fontSize: 13,
                                fontWeight: 600
                            }}
                        >
                            Selected member
                        </Typography>

                        <Paper
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 1.5,
                                px: 1.5,
                                py: 1.25,
                                border:
                                    "1px solid",
                                borderColor:
                                    "primary.main",
                                borderRadius: 2,
                                boxShadow: "none"
                            }}
                        >
                            <Avatar
                                src={
                                    selectedUser.avatar ||
                                    undefined
                                }
                                sx={{
                                    width: 40,
                                    height: 40
                                }}
                            >
                                {selectedUser.first_name?.charAt(
                                    0
                                )}
                            </Avatar>

                            <Box
                                sx={{
                                    flex: 1
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 14
                                    }}
                                >
                                    {
                                        selectedUser.first_name
                                    }{" "}
                                    {
                                        selectedUser.last_name
                                    }
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{ fontSize: 12 }}
                                >
                                    {
                                        selectedUser.email
                                    }
                                </Typography>
                            </Box>

                            <CheckCircleRoundedIcon
                                color="primary"
                            />
                        </Paper>

                        <Divider
                            sx={{ my: 2 }}
                        />

                        <FormControl fullWidth>
                            <InputLabel>
                                Role
                            </InputLabel>

                            <Select
                                value={role}
                                label="Role"
                                onChange={(event) =>
                                    setRole(
                                        event.target.value
                                    )
                                }
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
                    </Box>
                )}

                {inviteError && (
                    <Typography
                        color="error"
                        sx={{ mt: 2, fontSize: 13 }}
                    >
                        {inviteError}
                    </Typography>
                )}
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 2
                }}
            >
                <Button
                    onClick={handleClose}
                    disabled={inviting}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleInvite}
                    disabled={
                        !selectedUser ||
                        inviting
                    }
                >
                    {inviting ? (
                        <CircularProgress
                            size={20}
                            color="inherit"
                        />
                    ) : (
                        "Invite"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );


}
