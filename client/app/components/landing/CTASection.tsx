"use client";

import {
    Button,
    Card,
    Container,
    Stack,
    Typography
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";

export default function CTASection() {
    return (
        <Container maxWidth="md">
            <Card
                elevation={0}
                sx={{
                    borderRadius: 4,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    textAlign: "center",
                    px: { xs: 3, md: 8 },
                    py: { xs: 6, md: 8 },
                    my: { xs: 8, md: 10 }
                }}
            >
                <Stack
                    spacing={2.5}
                    sx={{alignItems:'center'}}
                >
                    <AutoAwesomeRoundedIcon sx={{ fontSize: 40 }} />

                    <Typography
                        component="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: {
                                xs: 30,
                                md: 42
                            },
                            letterSpacing: "-.03em"
                        }}
                    >
                        Turn your documents into an intelligent knowledge base.
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: 600,
                            opacity: 0.88,
                            lineHeight: 1.7
                        }}
                    >
                        Bring your team's knowledge together and make it
                        instantly accessible through AI-powered search and chat.
                    </Typography>

                    <Button
                        component={Link}
                        href="/auth/register"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardRoundedIcon />}
                        sx={{
                            bgcolor: "white",
                            color: "primary.main",
                            px: 3,
                            py: 1.4,
                            borderRadius: 2.5,
                            textTransform: "none",
                            fontWeight: 750
                        }}
                    >
                        Create Your Workspace
                    </Button>
                </Stack>
            </Card>
        </Container>
    );
}