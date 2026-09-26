"use client";

import { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";

const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Use cases", href: "#use-cases" }
];

export default function LandingNavbar() {
    const { user, loading } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (loading) {
        return null;
    }

    const closeMobileMenu = () => setMobileOpen(false);

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                color="transparent"
                sx={{
                    bgcolor: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(18px)",
                    borderBottom: "1px solid",
                    borderColor: "rgba(15,23,42,0.08)",
                    zIndex: 1100
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        disableGutters
                        sx={{
                            minHeight: { xs: 68, md: 76 },
                            gap: 2
                        }}
                    >
                        <Stack
                            component={Link}
                            href="/"
                            direction="row"
                            spacing={1.25}
                            sx={{
                                flexGrow: 1,
                                textDecoration: "none",
                                color: "text.primary",
                                width: "fit-content",
                                alignItems: "center",
                                minWidth: 0
                            }}
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2.5,
                                    display: "grid",
                                    placeItems: "center",
                                    background:
                                        "linear-gradient(135deg, #1976d2 0%, #7c3aed 100%)",
                                    color: "white",
                                    boxShadow:
                                        "0 8px 24px rgba(25,118,210,.22)"
                                }}
                            >
                                <AutoAwesomeRoundedIcon fontSize="small" />
                            </Box>

                            <Box sx={{ minWidth: 0 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: { xs: 16, md: 17 },
                                        lineHeight: 1.1,
                                        letterSpacing: "-.02em"
                                    }}
                                >
                                    AI Knowledge Base
                                </Typography>

                                <Typography
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                        fontSize: 10.5,
                                        color: "text.secondary",
                                        mt: 0.25,
                                        letterSpacing: ".02em"
                                    }}
                                >
                                    Intelligent organizational knowledge
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex"
                                },
                                alignItems: "center"
                            }}
                        >
                            {navItems.map((item) => (
                                <Button
                                    key={item.href}
                                    component="a"
                                    href={item.href}
                                    color="inherit"
                                    sx={{
                                        px: 1.5,
                                        color: "text.secondary",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": {
                                            color: "text.primary",
                                            bgcolor: "grey.50"
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center"
                            }}
                        >
                            {!user && (
                                <Button
                                    component={Link}
                                    href="/auth/login"
                                    color="inherit"
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "inline-flex"
                                        },
                                        color: "text.primary",
                                        fontWeight: 650,
                                        textTransform: "none",
                                        px: 1.5
                                    }}
                                >
                                    Login
                                </Button>
                            )}

                            {!user && (
                                <Button
                                    component={Link}
                                    href="/auth/register"
                                    variant="contained"
                                    endIcon={
                                        <ArrowForwardRoundedIcon
                                            sx={{
                                                fontSize:
                                                    "18px !important"
                                            }}
                                        />
                                    }
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "inline-flex"
                                        },
                                        borderRadius: 2.5,
                                        px: 2,
                                        py: 1.05,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        boxShadow:
                                            "0 8px 20px rgba(25,118,210,.18)",
                                        "&:hover": {
                                            boxShadow:
                                                "0 10px 25px rgba(25,118,210,.25)"
                                        }
                                    }}
                                >
                                    Get Started
                                </Button>
                            )}

                            {user && (
                                <Button
                                    component={Link}
                                    href="/dashboard"
                                    variant="contained"
                                    endIcon={
                                        <ArrowForwardRoundedIcon
                                            sx={{
                                                fontSize:
                                                    "18px !important"
                                            }}
                                        />
                                    }
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "inline-flex"
                                        },
                                        borderRadius: 2.5,
                                        px: 2,
                                        py: 1.05,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        boxShadow:
                                            "0 8px 20px rgba(25,118,210,.18)",
                                        "&:hover": {
                                            boxShadow:
                                                "0 10px 25px rgba(25,118,210,.25)"
                                        }
                                    }}
                                >
                                    Dashboard
                                </Button>
                            )}

                            <IconButton
                                onClick={() => setMobileOpen(true)}
                                sx={{
                                    display: {
                                        xs: "flex",
                                        md: "none"
                                    },
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 2
                                }}
                                aria-label="Open navigation menu"
                            >
                                <MenuRoundedIcon />
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={closeMobileMenu}
                ModalProps={{ keepMounted: true }}
            >
                <Box sx={{ width: 280, p: 2 }}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            px: 1
                        }}
                    >
                        Explore
                    </Typography>

                    <List disablePadding>
                        {navItems.map((item) => (
                            <ListItemButton
                                key={item.href}
                                component="a"
                                href={item.href}
                                onClick={closeMobileMenu}
                                sx={{ borderRadius: 2 }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        ))}

                        {!user && (
                            <>
                                <ListItemButton
                                    component={Link}
                                    href="/auth/login"
                                    onClick={closeMobileMenu}
                                    sx={{ borderRadius: 2, mt: 1 }}
                                >
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                                <ListItemButton
                                    component={Link}
                                    href="/auth/register"
                                    onClick={closeMobileMenu}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <ListItemText primary="Get Started" />
                                </ListItemButton>
                            </>
                        )}

                        {user && (
                            <ListItemButton
                                component={Link}
                                href="/dashboard"
                                onClick={closeMobileMenu}
                                sx={{ borderRadius: 2, mt: 1 }}
                            >
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}