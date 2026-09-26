import {
    Box,
    Card,
    Chip,
    Container,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

const members = [
    ["Sarah Ahmed", "OWNER"],
    ["John Khan", "ADMIN"],
    ["Ali Raza", "EDITOR"],
    ["Maria Smith", "VIEWER"]
];

export default function CollaborationSection() {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 11 },
                bgcolor: "background.paper"
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={6}
                    sx={{ alignItems: "center" }}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2.5}>
                            <Chip
                                label="Built for teams"
                                sx={{
                                    width: "fit-content",
                                    fontWeight: 700,
                                    color: "primary.main",
                                    bgcolor: "primary.50"
                                }}
                            />

                            <Typography
                                component="h2"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: {
                                        xs: 30,
                                        md: 44
                                    },
                                    letterSpacing: "-.03em"
                                }}
                            >
                                Keep your team aligned around one source of truth.
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ lineHeight: 1.8 }}
                            >
                                Create workspaces, invite teammates and control
                                access with role-based permissions. Everyone gets
                                access to the knowledge they need.
                            </Typography>

                            <Stack spacing={1.5}>
                                {[
                                    "Shared team workspaces",
                                    "Role-based access control",
                                    "Centralized organizational knowledge"
                                ].map((item) => (
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        sx={{ alignItems: "center" }}
                                        key={item}
                                    >
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                bgcolor: "primary.main"
                                            }}
                                        />

                                        <Typography sx={{ fontWeight: 600 }}>
                                            {item}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            elevation={0}
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 4,
                                p: { xs: 2, sm: 3 },
                                boxShadow:
                                    "0 20px 60px rgba(15,23,42,.07)"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 750,
                                    mb: 2
                                }}
                            >
                                Workspace members
                            </Typography>

                            {members.map(([name, role], index) => (
                                <Box key={name}>
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        sx={{ py: 1.5, alignItems: "center" }}
                                    >
                                        <Box
                                            sx={{
                                                width: 38,
                                                height: 38,
                                                borderRadius: "50%",
                                                display: "grid",
                                                placeItems: "center",
                                                bgcolor:
                                                    index === 0
                                                        ? "primary.main"
                                                        : "grey.200",
                                                color:
                                                    index === 0
                                                        ? "white"
                                                        : "text.secondary",
                                                fontWeight: 700,
                                                fontSize: 13
                                            }}
                                        >
                                            {name.charAt(0)}
                                        </Box>

                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    fontWeight: 650
                                                }}
                                            >
                                                {name}
                                            </Typography>

                                            <Typography
                                                sx={{ fontSize: 11.5 }}
                                                color="text.secondary"
                                            >
                                                Workspace member
                                            </Typography>
                                        </Box>

                                        <Chip
                                            label={role}
                                            size="small"
                                            variant={
                                                role === "OWNER"
                                                    ? "filled"
                                                    : "outlined"
                                            }
                                        />
                                    </Stack>

                                    {index < members.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}