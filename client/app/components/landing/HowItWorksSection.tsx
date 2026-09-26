import {
    Card,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography,
    Box
} from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

const steps = [
    {
        number: "01",
        icon: <UploadFileRoundedIcon />,
        title: "Upload your knowledge",
        description:
            "Add your documents and build a centralized source of truth for your workspace."
    },
    {
        number: "02",
        icon: <StorageRoundedIcon />,
        title: "AI processes it",
        description:
            "Your content is processed, split into useful pieces, embedded and prepared for retrieval."
    },
    {
        number: "03",
        icon: <SmartToyRoundedIcon />,
        title: "Ask anything",
        description:
            "Ask questions in natural language and receive answers based on your organization's knowledge."
    }
];

export default function HowItWorksSection() {
    return (
        <Box
            id="how-it-works"
            sx={{
                py: { xs: 8, md: 11 },
                bgcolor: "background.paper"
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    spacing={2}
                    sx={{ alignItems: "center", mb: 7, textAlign: "center" }}
                >
                    <Typography
                        sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: 13,
                            textTransform: "uppercase",
                            letterSpacing: ".12em"
                        }}
                    >
                        How it works
                    </Typography>

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
                        Turn documents into useful knowledge
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            maxWidth: 650,
                            lineHeight: 1.7
                        }}
                    >
                        A simple workflow that transforms your organization's
                        documents into an intelligent, searchable knowledge base.
                    </Typography>
                </Stack>

                <Grid container spacing={3}>
                    {steps.map((step) => (
                        <Grid
                            size={{ xs: 12, md: 4 }}
                            key={step.number}
                        >
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 3
                                }}
                            >
                                <CardContent sx={{ p: 3.5 }}>
                                    <Stack spacing={2.5}>
                                        <Stack
                                            direction="row"
                                            sx={{ justifyContent: "space-between", alignItems: "center" }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 2,
                                                    display: "grid",
                                                    placeItems: "center",
                                                    bgcolor: "primary.50",
                                                    color: "primary.main"
                                                }}
                                            >
                                                {step.icon}
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 800,
                                                    color: "grey.300"
                                                }}
                                            >
                                                {step.number}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            sx={{
                                                fontSize: 20,
                                                fontWeight: 750
                                            }}
                                        >
                                            {step.title}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            sx={{ lineHeight: 1.7 }}
                                        >
                                            {step.description}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}