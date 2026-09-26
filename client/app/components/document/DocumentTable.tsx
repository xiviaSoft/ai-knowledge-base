"use client";
import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    IconButton,
    Typography,
    CircularProgress,
    Stack,
    Tooltip
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { useParams, useRouter } from "next/navigation";

export default function DocumentTable({
    documents,
    onDelete,
    onRetry
}: {
    documents: any[];
    onDelete: (document: any) => void;
    onRetry: (documentId: string) => void;
}) {
    const router = useRouter();
    const { workspaceId } = useParams();

    const getStatus = (status: string) => {
        switch (status) {
            case "UPLOADING":
                return {
                    label: "Uploading",
                    color: "info" as const,
                    loading: true
                };
            case "PROCESSING":
                return {
                    label: "Processing",
                    color: "warning" as const,
                    loading: true
                };
            case "READY":
                return {
                    label: "Ready",
                    color: "success" as const,
                    loading: false
                };
            case "FAILED":
                return {
                    label: "Failed",
                    color: "error" as const,
                    loading: false
                };
            default:
                return {
                    label: status || "Unknown",
                    color: "default" as const,
                    loading: false
                };
        }
    };

    const handleView = (documentId: string) => {
        router.push(
            `/workspace/${workspaceId}/documents/${documentId}`
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
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                            Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                            Type
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                            Size
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                            Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                            Uploaded
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
                    {documents.map((doc: any) => {
                        const status = getStatus(doc.status);
                        const isProcessing =
                            doc.status === "UPLOADING" ||
                            doc.status === "PROCESSING";
                        const isFailed = doc.status === "FAILED";

                        return (
                            <TableRow
                                key={doc.id}
                                hover
                                sx={{
                                    "&:last-child td": {
                                        borderBottom: 0
                                    }
                                }}
                            >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            color: "text.primary",
                                            maxWidth: 450,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        {doc.original_name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {doc.mime_type ||
                                            doc.file_type ||
                                            "Unknown"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {doc.file_size
                                            ? `${(
                                                Number(doc.file_size) /
                                                1024 /
                                                1024
                                            ).toFixed(2)} MB`
                                            : "—"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={status.label}
                                        color={status.color}
                                        size="small"
                                        icon={
                                            status.loading ? (
                                                <CircularProgress
                                                    size={14}
                                                    color="inherit"
                                                />
                                            ) : undefined
                                        }
                                        sx={{
                                            fontWeight: 600
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {doc.created_at
                                            ? new Date(
                                                doc.created_at
                                            ).toLocaleDateString()
                                            : "—"}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            justifyContent: "flex-end"
                                        }}
                                    >
                                        <Tooltip title="See document">
                                            <span>
                                                <IconButton
                                                    color="primary"
                                                    disabled={isProcessing}
                                                    onClick={() =>
                                                        handleView(doc.id)
                                                    }
                                                >
                                                    <VisibilityOutlinedIcon />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        {isFailed && (
                                            <Tooltip title="Retry processing">
                                                <span>
                                                    <IconButton
                                                        color="warning"
                                                        onClick={() =>
                                                            onRetry(doc.id)
                                                        }
                                                    >
                                                        <ReplayRoundedIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Delete document">
                                            <span>
                                                <IconButton
                                                    color="error"
                                                    disabled={isProcessing}
                                                    onClick={() =>
                                                        onDelete(doc)
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
                                            </span>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}