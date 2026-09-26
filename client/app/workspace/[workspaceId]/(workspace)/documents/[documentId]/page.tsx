"use client";
import { Alert, Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import useDocumentDetails from "@/app/hooks/useDocumentDetails";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useRouter } from "next/navigation";
import ErrorIcon from "@mui/icons-material/Error";
import Loader from "@/app/components/ui/Loader";

export default function DocumentDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const workspaceId =
        params.workspaceId as string;

    const documentId =
        params.documentId as string;

    const {
        document,
        chunks,
        loading,
        error
    } = useDocumentDetails(documentId);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert
                    severity="error"
                    sx={{ borderRadius: 3 }}
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!document) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert
                    severity="error"
                    sx={{ borderRadius: 3 }}
                >
                    Document not found.
                </Alert>
            </Box>
        );
    }

    const status = getStatus(document.status);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1400,
                mx: "auto"
            }}
        >
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() =>
                    router.push(
                        `/workspace/${workspaceId}/documents`
                    )
                }
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    textTransform: "none"
                }}
            >
                Back to Documents
            </Button>

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 3,
                        md: 4
                    },
                    mb: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    background:
                        "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(255,255,255,0))"
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        md: "row"
                    }}
                    spacing={3}
                    sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            minWidth: 0, alignItems: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                backgroundColor:
                                    "primary.main",
                                color: "primary.contrastText"
                            }}
                        >
                            <DescriptionOutlinedIcon
                                sx={{
                                    fontSize: 30
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                minWidth: 0
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    wordBreak:
                                        "break-word"
                                }}
                            >
                                {
                                    document.original_name
                                }
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5
                                }}
                            >
                                Document details and
                                processed knowledge
                            </Typography>
                        </Box>
                    </Stack>

                    <Chip
                        icon={status.icon}
                        label={status.label}
                        color={status.color}
                        sx={{
                            fontWeight: 700,
                            px: 1,
                            py: 2.5,
                            borderRadius: 2
                        }}
                    />
                </Stack>
            </Paper>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)"
                    },
                    gap: 2,
                    mb: 3
                }}
            >
                <StatCard
                    icon={
                        <DescriptionOutlinedIcon />
                    }
                    label="File Type"
                    value={
                        document.file_type ||
                        "Unknown"
                    }
                />

                <StatCard
                    icon={
                        <StorageOutlinedIcon />
                    }
                    label="File Size"
                    value={formatFileSize(
                        document.file_size
                    )}
                />

                <StatCard
                    icon={
                        <DataObjectOutlinedIcon />
                    }
                    label="Database Chunks"
                    value={chunks.length}
                />

                <StatCard
                    icon={
                        <AccessTimeOutlinedIcon />
                    }
                    label="Uploaded"
                    value={formatDate(
                        document.created_at
                    )}
                />
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 3,
                        md: 4
                    },
                    mb: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider"
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        mb: 3
                    }}
                >
                    Document Information
                </Typography>

                <Stack spacing={0}>
                    <InfoRow
                        label="File Name"
                        value={
                            document.original_name
                        }
                    />

                    <Divider />

                    <InfoRow
                        label="File Type"
                        value={
                            document.file_type ||
                            "Unknown"
                        }
                    />

                    <Divider />

                    <InfoRow
                        label="File Size"
                        value={formatFileSize(
                            document.file_size
                        )}
                    />

                    <Divider />

                    <InfoRow
                        label="Processing Status"
                        value={
                            <Chip
                                icon={status.icon}
                                label={status.label}
                                color={status.color}
                                size="small"
                                sx={{
                                    fontWeight: 700
                                }}
                            />
                        }
                    />

                    <Divider />

                    <InfoRow
                        label="Uploaded"
                        value={formatDate(
                            document.created_at
                        )}
                    />

                    <Divider />

                    <InfoRow
                        label="Database Chunks"
                        value={chunks.length}
                    />
                </Stack>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 3,
                        md: 4
                    },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider"
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={1}
                    sx={{ mb: 3, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800
                            }}
                        >
                            Document Chunks
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            Text segments stored in
                            the database for RAG
                            retrieval.
                        </Typography>
                    </Box>

                    <Chip
                        label={`${chunks.length} ${chunks.length === 1
                            ? "chunk"
                            : "chunks"
                            }`}
                        variant="outlined"
                        size="small"
                    />
                </Stack>

                {chunks.length > 0 ? (
                    <Stack spacing={2}>
                        {chunks.map(
                            (
                                chunk: any,
                                index: number
                            ) => (
                                <Box
                                    key={
                                        chunk.id ||
                                        index
                                    }
                                    sx={{
                                        border:
                                            "1px solid",
                                        borderColor:
                                            "divider",
                                        borderRadius: 3,
                                        overflow:
                                            "hidden",
                                        backgroundColor:
                                            "background.paper"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            px: 3,
                                            py: 1.5,
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "space-between",
                                            backgroundColor:
                                                "action.hover",
                                            borderBottom:
                                                "1px solid",
                                            borderColor:
                                                "divider"
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            sx={{ alignItems: 'center' }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 2,
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center",
                                                    backgroundColor:
                                                        "primary.main",
                                                    color:
                                                        "primary.contrastText"
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight:
                                                            800
                                                    }}
                                                >
                                                    {index +
                                                        1}
                                                </Typography>
                                            </Box>

                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight:
                                                        700
                                                }}
                                            >
                                                Chunk{" "}
                                                {index +
                                                    1}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Index:{" "}
                                            {
                                                chunk.chunk_index
                                            }
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: 3
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                whiteSpace:
                                                    "pre-wrap",
                                                lineHeight:
                                                    1.8,
                                                color:
                                                    "text.primary"
                                            }}
                                        >
                                            {
                                                chunk.content
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        )}
                    </Stack>
                ) : (
                    <Alert
                        severity="info"
                        sx={{
                            borderRadius: 3
                        }}
                    >
                        No database chunks were
                        found for this document.
                    </Alert>
                )}
            </Paper>
        </Box>
    );
}

function StatCard({
    icon,
    label,
    value
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider"
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'center' }}
            >
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                            "action.hover",
                        color: "primary.main"
                    }}
                >
                    {icon}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {label}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 700,
                            mt: 0.25,
                            wordBreak:
                                "break-word"
                        }}
                    >
                        {value}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );
}

function InfoRow({
    label,
    value
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <Stack
            direction={{
                xs: "column",
                sm: "row"
            }}
            spacing={1}
            sx={{
                py: 2,
                justifyContent:
                    "space-between",
                alignItems: {
                    sm: "center"
                }
            }}
        >
            <Typography
                color="text.secondary"
            >
                {label}
            </Typography>

            <Box
                sx={{
                    maxWidth: {
                        sm: "65%"
                    },
                    textAlign: {
                        sm: "right"
                    },
                    wordBreak:
                        "break-word"
                }}
            >
                {typeof value === "string" ||
                    typeof value === "number" ? (
                    <Typography
                        sx={{
                            fontWeight: 600
                        }}
                    >
                        {value}
                    </Typography>
                ) : (
                    value
                )}
            </Box>
        </Stack>
    );
}

function getStatus(status?: string) {
    switch (status) {
        case "READY":
            return {
                label: "Ready",
                color: "success" as const,
                icon: (
                    <CheckCircleIcon />
                )
            };

        case "PROCESSING":
            return {
                label: "Processing",
                color: "warning" as const,
                icon: (
                    <HourglassTopOutlinedIcon />
                )
            };

        case "UPLOADING":
            return {
                label: "Uploading",
                color: "info" as const,
                icon: (
                    <HourglassTopOutlinedIcon />
                )
            };

        case "FAILED":
            return {
                label: "Failed",
                color: "error" as const,
                icon: <ErrorIcon />
            };

        default:
            return {
                label: status || "Unknown",
                color: "default" as const,
                icon: <DescriptionOutlinedIcon />
            };
    }
}

function formatFileSize(
    size?: string | number
) {
    const bytes = Number(size);

    if (!Number.isFinite(bytes)) {
        return "Unknown";
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(
            bytes / 1024
        ).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(1)} MB`;
    }

    return `${(
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(1)} GB`;
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