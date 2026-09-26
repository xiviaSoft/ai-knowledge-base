"use client";

import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/ui/Loader";
import useMemberDetails from "@/app/hooks/useMemberDetails";

export default function MemberDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const workspaceId = params.workspaceId as string;
    const memberId = params.memberId as string;

    const {
        member,
        loading,
        error
    } = useMemberDetails(
        workspaceId,
        memberId
    );

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!member) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    Member not found.
                </Alert>
            </Box>
        );
    }

    const user = member.users;

    const fullName = [
        user?.first_name,
        user?.last_name
    ]
        .filter(Boolean)
        .join(" ") || "Unknown User";

    const role = member.role || "VIEWER";

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() =>
                    router.push(
                        `/workspace/${workspaceId}/members`
                    )
                }
                sx={{ mb: 3 }}
            >
                Back to Members
            </Button>

            <Paper
                sx={{
                    p: {
                        xs: 3,
                        md: 5
                    },
                    borderRadius: 4,
                    mb: 3
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={3}

                    sx={{
                        alignItems: {
                            xs: "flex-start",
                            sm: "center"
                        }
                    }}
                >
                    <Avatar
                        src={user?.avatar || undefined}
                        sx={{
                            width: 80,
                            height: 80,
                            fontSize: 30,
                            fontWeight: 700
                        }}
                    >
                        {fullName.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                wordBreak: "break-word"
                            }}
                        >
                            {fullName}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}
                        >
                            <EmailOutlinedIcon
                                fontSize="small"
                                color="disabled"
                            />

                            <Typography
                                color="text.secondary"
                            >
                                {user?.email || "No email"}
                            </Typography>
                        </Stack>
                    </Box>

                    <Chip
                        label={role}
                        color={
                            role === "OWNER"
                                ? "error"
                                : role === "ADMIN"
                                    ? "warning"
                                    : role === "EDITOR"
                                        ? "info"
                                        : "default"
                        }
                        sx={{
                            fontWeight: 700
                        }}
                    />
                </Stack>
            </Paper>

            <Stack spacing={3}>
                <Paper
                    sx={{
                        p: {
                            xs: 3,
                            md: 4
                        },
                        borderRadius: 4
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 3
                        }}
                    >
                        Member Information
                    </Typography>

                    <Stack spacing={2}>
                        <InfoRow
                            icon={<PersonOutlinedIcon />}
                            label="First Name"
                            value={
                                user?.first_name ||
                                "Unknown"
                            }
                        />

                        <Divider />

                        <InfoRow
                            icon={<PersonOutlinedIcon />}
                            label="Last Name"
                            value={
                                user?.last_name ||
                                "Not provided"
                            }
                        />

                        <Divider />

                        <InfoRow
                            icon={<EmailOutlinedIcon />}
                            label="Email"
                            value={
                                user?.email ||
                                "Not available"
                            }
                        />

                        <Divider />

                        <InfoRow
                            icon={<BadgeOutlinedIcon />}
                            label="Role"
                            value={
                                <Chip
                                    label={role}
                                    size="small"
                                    color={
                                        role === "OWNER"
                                            ? "error"
                                            : role === "ADMIN"
                                                ? "warning"
                                                : role === "EDITOR"
                                                    ? "info"
                                                    : "default"
                                    }
                                />
                            }
                        />

                        <Divider />

                        <InfoRow
                            icon={
                                <CalendarTodayOutlinedIcon />
                            }
                            label="Joined"
                            value={formatDate(
                                member.joined_at
                            )}
                        />
                    </Stack>
                </Paper>

                <Paper
                    sx={{
                        p: {
                            xs: 3,
                            md: 4
                        },
                        borderRadius: 4
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 3
                        }}
                    >
                        Workspace Information
                    </Typography>

                    <Stack spacing={2}>
                        <InfoRow
                            icon={
                                <WorkspacesOutlinedIcon />
                            }
                            label="Workspace"
                            value={
                                member.workspaces
                                    ?.name ||
                                "Unknown Workspace"
                            }
                        />

                        <Divider />

                        <InfoRow
                            icon={
                                <WorkspacesOutlinedIcon />
                            }
                            label="Workspace Slug"
                            value={
                                member.workspaces
                                    ?.slug ||
                                "Not available"
                            }
                        />

                        <Divider />

                        <InfoRow
                            icon={<BadgeOutlinedIcon />}
                            label="Member ID"
                            value={member.id}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </Box >
    );
}

function InfoRow({
    icon,
    label,
    value
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <Stack
            direction={{
                xs: "column",
                sm: "row"
            }}
            spacing={2}

            sx={{
                alignItems: {
                    xs: "flex-start",
                    sm: "center"
                }
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    minWidth: {
                        sm: 180
                    },
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        color: "text.secondary"
                    }}
                >
                    {icon}
                </Box>

                <Typography color="text.secondary">
                    {label}
                </Typography>
            </Stack>

            <Typography
                component="div"
                sx={{
                    fontWeight: 500,
                    wordBreak: "break-word"
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
}

function formatDate(date?: string) {
    if (!date) {
        return "Unknown";
    }

    const parsedDate = new Date(date);

    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {
        return "Unknown";
    }

    return parsedDate.toLocaleString();
}