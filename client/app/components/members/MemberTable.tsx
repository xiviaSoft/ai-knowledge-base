"use client";
import {
    Avatar,
    Box,
    Chip,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
    WorkspaceMember,
    WorkspaceMemberRole
} from "@/app/services/workspaceMember.service";
import { useRouter } from "next/navigation";
interface MemberTableProps {
    members: WorkspaceMember[];
    workspaceId: string;
    currentUserId?: string;
    canManageRoles?: boolean;
    canRemoveMembers?: boolean;
    loading?: boolean;
    actionLoading?: boolean;
    onRoleChange: (
        memberId: string,
        role: Exclude<WorkspaceMemberRole, "OWNER">
    ) => void;
    onRemove: (member: WorkspaceMember) => void;
}
const roleOptions: Exclude<
    WorkspaceMemberRole,
    "OWNER"
>[] = [
    "ADMIN",
    "EDITOR",
    "VIEWER"
];
const roleColors: Record<
    WorkspaceMemberRole,
    "default" | "primary" | "success" | "warning"
> = {
    OWNER: "primary",
    ADMIN: "warning",
    EDITOR: "success",
    VIEWER: "default"
};
export default function MemberTable({
    members,
    workspaceId,
    currentUserId,
    canManageRoles = false,
    canRemoveMembers = false,
    loading = false,
    actionLoading = false,
    onRoleChange,
    onRemove
}: MemberTableProps) {
    const router = useRouter();
    if (loading) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB"
                }}
            >
                <Typography
                    color="text.secondary"
                    align="center"
                >
                    Loading members...
                </Typography>
            </Paper>
        );
    }
    if (!members.length) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB"
                }}
            >
                <Typography
                    align="center"
                    sx={{ fontWeight: 600 }}
                >
                    No members found.
                </Typography>
                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Invite members to start collaborating.
                </Typography>
            </Paper>
        );
    }
    const handleView = (memberId: string) => {
        router.push(
            `/workspace/${workspaceId}/members/${memberId}`
        );
    };
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF"
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: "#F8FAFC"
                        }}
                    >
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: "text.secondary"
                            }}
                        >
                            Member
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: "text.secondary"
                            }}
                        >
                            Email
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: "text.secondary"
                            }}
                        >
                            Role
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                color: "text.secondary"
                            }}
                        >
                            Joined
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                fontWeight: 700,
                                color: "text.secondary"
                            }}
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member) => {
                        const user = member.users;
                        const isCurrentUser =
                            member.user_id === currentUserId;
                        const isOwner =
                            member.role === "OWNER";
                        const fullName =
                            `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                            "Unknown User";
                        return (
                            <TableRow
                                key={member.id}
                                hover
                                sx={{
                                    "&:last-child td": {
                                        borderBottom: 0
                                    }
                                }}
                            >
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                user.avatar ||
                                                undefined
                                            }
                                            alt={fullName}
                                        >
                                            {user.first_name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: 600
                                                }}
                                            >
                                                {fullName}
                                            </Typography>
                                            {isCurrentUser && (
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    You
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {user.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {canManageRoles &&
                                    !isOwner &&
                                    !isCurrentUser ? (
                                        <Select
                                            size="small"
                                            value={member.role}
                                            disabled={actionLoading}
                                            onChange={(event) =>
                                                onRoleChange(
                                                    member.id,
                                                    event.target.value as Exclude<
                                                        WorkspaceMemberRole,
                                                        "OWNER"
                                                    >
                                                )
                                            }
                                            sx={{
                                                minWidth: 120
                                            }}
                                        >
                                            {roleOptions.map(
                                                (role) => (
                                                    <MenuItem
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    ) : (
                                        <Chip
                                            label={member.role}
                                            color={
                                                roleColors[
                                                    member.role
                                                ]
                                            }
                                            size="small"
                                            sx={{
                                                fontWeight: 600
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {member.joined_at
                                            ? new Date(
                                                member.joined_at
                                            ).toLocaleDateString()
                                            : "—"}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            gap: 0.5
                                        }}
                                    >
                                        <Tooltip title="View member">
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleView(
                                                        member.id
                                                    )
                                                }
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(25, 118, 210, 0.08)"
                                                    }
                                                }}
                                            >
                                                <VisibilityOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {canRemoveMembers &&
                                        !isOwner &&
                                        !isCurrentUser ? (
                                            <Tooltip title="Remove member">
                                                <IconButton
                                                    color="error"
                                                    disabled={
                                                        actionLoading
                                                    }
                                                    onClick={() =>
                                                        onRemove(
                                                            member
                                                        )
                                                    }
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "rgba(239, 68, 68, 0.08)"
                                                        }
                                                    }}
                                                >
                                                    <DeleteOutlineRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : null}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}