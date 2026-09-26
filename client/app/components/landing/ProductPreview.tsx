import {
    Box,
    Card,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const documents = [
    {
        name: "Employee Handbook.pdf",
        size: "2.4 MB",
        active: true
    },
    {
        name: "Company Policies.pdf",
        size: "1.8 MB",
        active: false
    },
    {
        name: "Product Documentation.pdf",
        size: "3.2 MB",
        active: false
    },
    {
        name: "Engineering Guide.pdf",
        size: "1.1 MB",
        active: false
    }
];

export default function ProductPreview() {
    return (
        <Card
            elevation={0}
            sx={{
                position: "relative",
                border: "1px solid",
                borderColor: "rgba(15,23,42,.10)",
                borderRadius: 4,
                overflow: "hidden",
                bgcolor: "#ffffff",
                boxShadow: "0 30px 80px rgba(15,23,42,.14)"
            }}
        >
            <Box
                sx={{
                    px: 2,
                    py: 1.4,
                    borderBottom: "1px solid",
                    borderColor: "rgba(15,23,42,.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    bgcolor: "#fafbfc"
                }}
            >
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#ef4444"
                    }}
                />
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#f59e0b"
                    }}
                />
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#22c55e"
                    }}
                />
                <Typography
                    sx={{
                        ml: 1,
                        fontSize: 11.5,
                        fontWeight: 650,
                        color: "text.secondary"
                    }}
                >
                    AI Knowledge Base
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    minHeight: 455,
                    flexDirection: { xs: "column", md: "row" }
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "28%" },
                        minWidth: { xs: 0, md: 150 },
                        bgcolor: "#f8fafc",
                        borderRight: { xs: "none", md: "1px solid" },
                        borderBottom: { xs: "1px solid", md: "none" },
                        borderColor: "rgba(15,23,42,.08)",
                        p: { xs: 1.5, md: 1.7 }
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mb: 2.2, alignItems: "center" }}
                    >
                        <Box
                            sx={{
                                width: 30,
                                height: 30,
                                borderRadius: 1.8,
                                display: "grid",
                                placeItems: "center",
                                background:
                                    "linear-gradient(135deg, #1976d2, #7c3aed)",
                                color: "white"
                            }}
                        >
                            <AutoAwesomeRoundedIcon
                                sx={{ fontSize: 16 }}
                            />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography
                                sx={{
                                    fontSize: 11,
                                    fontWeight: 800,
                                    lineHeight: 1.2
                                }}
                            >
                                Acme Workspace
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 9.5,
                                    color: "text.secondary",
                                    mt: 0.3
                                }}
                            >
                                Team knowledge
                            </Typography>
                        </Box>
                    </Stack>

                    <Typography
                        sx={{
                            fontSize: 9.5,
                            fontWeight: 800,
                            color: "text.secondary",
                            letterSpacing: ".08em",
                            mb: 1
                        }}
                    >
                        KNOWLEDGE
                    </Typography>

                    <Stack spacing={0.5}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                px: 1,
                                py: 0.9,
                                borderRadius: 1.5,
                                bgcolor: "rgba(25,118,210,.08)",
                                color: "primary.main"
                            }}
                        >
                            <DescriptionOutlinedIcon
                                sx={{ fontSize: 16 }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 10.5,
                                    fontWeight: 700
                                }}
                            >
                                Documents
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                px: 1,
                                py: 0.9,
                                borderRadius: 1.5,
                                color: "text.secondary"
                            }}
                        >
                            <SearchRoundedIcon
                                sx={{ fontSize: 16 }}
                            />
                            <Typography sx={{ fontSize: 10.5 }}>
                                AI Search
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                px: 1,
                                py: 0.9,
                                borderRadius: 1.5,
                                color: "text.secondary"
                            }}
                        >
                            <GroupsRoundedIcon
                                sx={{ fontSize: 16 }}
                            />
                            <Typography sx={{ fontSize: 10.5 }}>
                                Team
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                        sx={{
                            fontSize: 9.5,
                            fontWeight: 800,
                            color: "text.secondary",
                            letterSpacing: ".08em",
                            mb: 1
                        }}
                    >
                        YOUR DOCUMENTS
                    </Typography>

                    <Stack spacing={0.6}>
                        {documents.map((document) => (
                            <Box
                                key={document.name}
                                sx={{
                                    p: 1,
                                    borderRadius: 1.5,
                                    bgcolor: document.active
                                        ? "rgba(25,118,210,.06)"
                                        : "transparent",
                                    border: document.active
                                        ? "1px solid rgba(25,118,210,.10)"
                                        : "1px solid transparent"
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={0.8}
                                    sx={{ alignItems: "flex-start" }}
                                >
                                    <DescriptionOutlinedIcon
                                        sx={{
                                            fontSize: 15,
                                            mt: 0.1,
                                            color: document.active
                                                ? "primary.main"
                                                : "text.secondary"
                                        }}
                                    />
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography
                                            sx={{
                                                fontSize: 9.5,
                                                fontWeight: document.active
                                                    ? 700
                                                    : 500,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}
                                        >
                                            {document.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: 8.5,
                                                color: "text.secondary",
                                                mt: 0.2
                                            }}
                                        >
                                            {document.size}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        p: { xs: 2, sm: 2.8 }
                    }}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 1, md: 0 }}
                        sx={{
                            mb: 2,
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", md: "center" }
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 800
                                }}
                            >
                                Ask your knowledge base
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 10,
                                    color: "text.secondary",
                                    mt: 0.3
                                }}
                            >
                                Search across your organization&apos;s knowledge
                            </Typography>
                        </Box>

                        <Chip
                            icon={
                                <CheckCircleRoundedIcon
                                    sx={{
                                        fontSize: "13px !important"
                                    }}
                                />
                            }
                            label="Ready"
                            size="small"
                            sx={{
                                height: 25,
                                fontSize: 9.5,
                                fontWeight: 700,
                                bgcolor: "rgba(34,197,94,.08)",
                                color: "success.main",
                                "& .MuiChip-icon": {
                                    color: "success.main"
                                }
                            }}
                        />
                    </Stack>

                    <Box
                        sx={{
                            p: 1.4,
                            borderRadius: 2.2,
                            bgcolor: "#f8fafc",
                            border: "1px solid",
                            borderColor: "rgba(15,23,42,.07)",
                            mb: 1.8
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center" }}
                        >
                            <SearchRoundedIcon
                                sx={{
                                    fontSize: 17,
                                    color: "text.secondary"
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 11.5,
                                    color: "text.primary"
                                }}
                            >
                                What is our employee leave policy?
                            </Typography>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            position: "relative",
                            p: 1.8,
                            borderRadius: 2.5,
                            background:
                                "linear-gradient(145deg, rgba(25,118,210,.055), rgba(124,58,237,.045))",
                            border: "1px solid",
                            borderColor: "rgba(25,118,210,.12)"
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{ mb: 1.2, justifyContent: "space-between", alignItems: "center" }}
                        >
                            <Stack
                                direction="row"
                                spacing={0.8}
                                sx={{ alignItems: "center" }}
                            >
                                <Box
                                    sx={{
                                        width: 27,
                                        height: 27,
                                        borderRadius: 1.5,
                                        display: "grid",
                                        placeItems: "center",
                                        background:
                                            "linear-gradient(135deg, #1976d2, #7c3aed)",
                                        color: "white"
                                    }}
                                >
                                    <AutoAwesomeRoundedIcon
                                        sx={{ fontSize: 15 }}
                                    />
                                </Box>

                                <Typography
                                    sx={{
                                        fontSize: 11.5,
                                        fontWeight: 800
                                    }}
                                >
                                    AI Answer
                                </Typography>
                            </Stack>

                            <Typography
                                sx={{
                                    fontSize: 8.5,
                                    fontWeight: 700,
                                    color: "success.main"
                                }}
                            >
                                94% confidence
                            </Typography>
                        </Stack>

                        <Typography
                            sx={{
                                fontSize: 11,
                                lineHeight: 1.7,
                                color: "text.secondary"
                            }}
                        >
                            Employees receive annual leave according to the
                            company&apos;s defined leave policy. Leave requests
                            should be submitted through the approved internal
                            process and are subject to manager approval.
                        </Typography>

                        <Box
                            sx={{
                                mt: 1.8,
                                pt: 1.3,
                                borderTop: "1px solid",
                                borderColor: "rgba(15,23,42,.08)"
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={0.7}
                                sx={{ mb: 0.9, alignItems: "center" }}
                            >
                                <MenuBookRoundedIcon
                                    sx={{
                                        fontSize: 14,
                                        color: "primary.main"
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: 9.5,
                                        fontWeight: 800
                                    }}
                                >
                                    Retrieved sources
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={0.7}
                                useFlexGap
                                sx={{ flexWrap: "wrap" }}
                            >
                                <Chip
                                    label="Employee Handbook.pdf"
                                    size="small"
                                    sx={{
                                        height: 24,
                                        fontSize: 8.5,
                                        fontWeight: 650,
                                        bgcolor: "white",
                                        border: "1px solid",
                                        borderColor:
                                            "rgba(15,23,42,.08)"
                                    }}
                                />
                                <Chip
                                    label="Company Policies.pdf"
                                    size="small"
                                    sx={{
                                        height: 24,
                                        fontSize: 8.5,
                                        fontWeight: 650,
                                        bgcolor: "white",
                                        border: "1px solid",
                                        borderColor:
                                            "rgba(15,23,42,.08)"
                                    }}
                                />
                            </Stack>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            mt: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.8
                        }}
                    >
                        <CheckCircleRoundedIcon
                            sx={{
                                fontSize: 14,
                                color: "success.main"
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: 9,
                                color: "text.secondary"
                            }}
                        >
                            Answer grounded in your workspace knowledge
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}