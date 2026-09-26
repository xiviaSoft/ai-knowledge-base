"use client";

import {
    Box,
    Button,
    Chip,
    Container,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Link from "next/link";
import ProductPreview from "./ProductPreview";

const capabilities = [
    {
        icon: <DescriptionRoundedIcon />,
        label: "Document intelligence"
    },
    {
        icon: <SearchRoundedIcon />,
        label: "Semantic retrieval"
    },
    {
        icon: <AutoAwesomeRoundedIcon />,
        label: "Grounded AI answers"
    }
];

const benefits = [
    "Centralize your organization's knowledge",
    "Ask questions using natural language",
    "Get answers based on your own documents",
    "Collaborate securely with your team"
];

export default function HeroSection() {
    return (
        <Box
            component="main"
            sx={{
                position: "relative",
                overflow: "hidden",
                background:
                    "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
                // pt: { xs: 7, sm: 9, md: 12 },
                pb: { xs: 8, md: 12 }
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 620,
                    height: 620,
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg, rgba(25,118,210,.13), rgba(124,58,237,.08))",
                    filter: "blur(90px)",
                    top: -300,
                    right: -160,
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    bgcolor: "rgba(124,58,237,.05)",
                    filter: "blur(80px)",
                    bottom: -220,
                    left: -180,
                    pointerEvents: "none"
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative" }}>
                <Grid
                    container
                    spacing={{ xs: 6, md: 8 }}
                    sx={{ alignItems: "center" }}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={{ xs: 2.5, md: 3 }}>
                           

                            <Typography
                                component="h4"
                                sx={{
                                    maxWidth: 700,
                                    fontSize: {
                                        xs: 36,
                                        sm: 46,
                                        md: 54,
                                        lg: 60
                                    },
                                    lineHeight: 1.02,
                                    fontWeight: 850
                                }}
                            >
                                Your company's knowledge,
                                <Box
                                    component="span"
                                    sx={{
                                        display: "block",
                                        background:
                                            "linear-gradient(90deg, #1976d2 0%, #7c3aed 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                >
                                    finally made intelligent.
                                </Box>
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{
                                    maxWidth: 650,
                                    fontSize: {
                                        xs: 16.5,
                                        md: 18
                                    },
                                    lineHeight: 1.8
                                }}
                            >
                                AI Knowledge Base transforms your organization's
                                documents into an intelligent, searchable
                                workspace. Upload policies, guides,
                                documentation and internal resources, then ask
                                questions in natural language and get answers
                                grounded in your own knowledge.
                            </Typography>

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row"
                                }}
                                spacing={1.5}
                                sx={{
                                    alignItems: {
                                        xs: "stretch",
                                        sm: "flex-start"
                                    }
                                }}
                            >
                                <Button
                                    component={Link}
                                    href="/auth/register"
                                    variant="contained"
                                    size="large"
                                    endIcon={
                                        <ArrowForwardRoundedIcon />
                                    }
                                    sx={{
                                        px: 3,
                                        py: 1.5,
                                        minHeight: 52,
                                        borderRadius: 2.5,
                                        textTransform: "none",
                                        fontSize: 15,
                                        fontWeight: 750,
                                        width: {
                                            xs: "100%",
                                            sm: "auto"
                                        },
                                        boxShadow:
                                            "0 12px 28px rgba(25,118,210,.22)",
                                        "&:hover": {
                                            boxShadow:
                                                "0 15px 34px rgba(25,118,210,.28)"
                                        }
                                    }}
                                >
                                    Create Your Workspace
                                </Button>

                                <Button
                                    component="a"
                                    href="#how-it-works"
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        px: 3,
                                        py: 1.5,
                                        minHeight: 52,
                                        borderRadius: 2.5,
                                        textTransform: "none",
                                        fontSize: 15,
                                        fontWeight: 700,
                                        borderColor:
                                            "rgba(15,23,42,.16)",
                                        color: "text.primary",
                                        width: {
                                            xs: "100%",
                                            sm: "auto"
                                        }
                                    }}
                                >
                                    Explore How It Works
                                </Button>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                useFlexGap
                                sx={{ pt: 0.5, flexWrap: "wrap" }}
                            >
                                {capabilities.map((item) => (
                                    <Stack
                                        key={item.label}
                                        direction="row"
                                        spacing={0.7}
                                        sx={{
                                            color: "text.secondary",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: 1.5,
                                                display: "grid",
                                                placeItems: "center",
                                                bgcolor:
                                                    "rgba(25,118,210,.07)",
                                                color: "primary.main"
                                            }}
                                        >
                                            {item.icon}
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontSize: 12.5,
                                                fontWeight: 650
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>

                            <Box
                                sx={{
                                    pt: 1.5,
                                    borderTop: "1px solid",
                                    borderColor:
                                        "rgba(15,23,42,.08)",
                                    maxWidth: 600
                                }}
                            >
                                <Grid container spacing={1.5}>
                                    {benefits.map((benefit) => (
                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 6
                                            }}
                                            key={benefit}
                                        >
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ alignItems: "flex-start" }}
                                            >
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        mt: 0.15,
                                                        fontSize: 17,
                                                        color: "primary.main"
                                                    }}
                                                />

                                                <Typography
                                                    sx={{
                                                        fontSize: 12.5,
                                                        color:
                                                            "text.secondary",
                                                        lineHeight: 1.5
                                                    }}
                                                >
                                                    {benefit}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                pt: { xs: 1, md: 3 }
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "78%",
                                    height: "80%",
                                    borderRadius: "50%",
                                    background:
                                        "linear-gradient(135deg, rgba(25,118,210,.13), rgba(124,58,237,.1))",
                                    filter: "blur(55px)"
                                }}
                            />

                            <Box
                                sx={{
                                    position: "relative"
                                }}
                            >
                                <ProductPreview />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: {
                                            xs: -8,
                                            sm: -28,
                                            md: -42
                                        },
                                        bottom: {
                                            xs: 18,
                                            md: 35
                                        },
                                        display: {
                                            xs: "none",
                                            sm: "block"
                                        },
                                        px: 2,
                                        py: 1.5,
                                        borderRadius: 2.5,
                                        bgcolor: "white",
                                        border: "1px solid",
                                        borderColor:
                                            "rgba(15,23,42,.08)",
                                        boxShadow:
                                            "0 16px 40px rgba(15,23,42,.1)"
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1.2}
                                        sx={{ alignItems: "center" }}
                                    >
                                        <Box
                                            sx={{
                                                width: 34,
                                                height: 34,
                                                borderRadius: 1.8,
                                                display: "grid",
                                                placeItems: "center",
                                                bgcolor:
                                                    "rgba(34,197,94,.1)",
                                                color: "success.main"
                                            }}
                                        >
                                            <GroupsRoundedIcon
                                                sx={{ fontSize: 19 }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 11,
                                                    color:
                                                        "text.secondary"
                                                }}
                                            >
                                                Workspace
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: 13,
                                                    fontWeight: 750
                                                }}
                                            >
                                                Team knowledge connected
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        right: {
                                            xs: -8,
                                            sm: -20,
                                            md: -30
                                        },
                                        top: {
                                            xs: 18,
                                            md: 48
                                        },
                                        display: {
                                            xs: "none",
                                            sm: "block"
                                        },
                                        px: 2,
                                        py: 1.5,
                                        borderRadius: 2.5,
                                        bgcolor: "white",
                                        border: "1px solid",
                                        borderColor:
                                            "rgba(15,23,42,.08)",
                                        boxShadow:
                                            "0 16px 40px rgba(15,23,42,.1)"
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1.2}
                                        sx={{ alignItems: "center" }}
                                    >
                                        <Box
                                            sx={{
                                                width: 34,
                                                height: 34,
                                                borderRadius: 1.8,
                                                display: "grid",
                                                placeItems: "center",
                                                bgcolor:
                                                    "rgba(124,58,237,.1)",
                                                color: "#7c3aed"
                                            }}
                                        >
                                            <AutoAwesomeRoundedIcon
                                                sx={{ fontSize: 19 }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 11,
                                                    color:
                                                        "text.secondary"
                                                }}
                                            >
                                                AI Retrieval
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: 13,
                                                    fontWeight: 750
                                                }}
                                            >
                                                Relevant knowledge found
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}