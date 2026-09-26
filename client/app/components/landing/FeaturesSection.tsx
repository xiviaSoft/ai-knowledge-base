import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

const features = [
    {
        icon: <DescriptionRoundedIcon />,
        title: "Knowledge Base",
        description:
            "Upload and organize your organization's documents in one centralized workspace."
    },
    {
        icon: <AutoAwesomeRoundedIcon />,
        title: "AI-Powered Chat",
        description:
            "Ask natural-language questions and get answers grounded in your own knowledge."
    },
    {
        icon: <SearchRoundedIcon />,
        title: "Semantic Search",
        description:
            "Find relevant information based on meaning instead of relying only on keywords."
    },
    {
        icon: <GroupsRoundedIcon />,
        title: "Team Collaboration",
        description:
            "Invite teammates and manage access to shared workspaces."
    },
    {
        icon: <SecurityRoundedIcon />,
        title: "Role-Based Access",
        description:
            "Control workspace capabilities with OWNER, ADMIN, EDITOR and VIEWER roles."
    },
    {
        icon: <BoltRoundedIcon />,
        title: "Fast AI Retrieval",
        description:
            "Retrieve relevant knowledge and generate useful answers through your AI pipeline."
    }
];

export default function FeaturesSection() {
    return (
        <Box
            id="features"
            sx={{
                py: { xs: 8, md: 11 }
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={2} sx={{ mb: 6 }}>
                    <Typography
                        sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: 13,
                            textTransform: "uppercase",
                            letterSpacing: ".12em"
                        }}
                    >
                        Everything you need
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
                        Built for modern knowledge teams
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            maxWidth: 650,
                            lineHeight: 1.7
                        }}
                    >
                        Everything is organized around making your team's
                        knowledge easier to access, understand and use.
                    </Typography>
                </Stack>

                <Grid container spacing={2.5}>
                    {features.map((feature) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4 }}
                            key={feature.title}
                        >
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    transition:
                                        "transform .2s, box-shadow .2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow:
                                            "0 15px 40px rgba(15,23,42,.08)"
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2,
                                            display: "grid",
                                            placeItems: "center",
                                            bgcolor: "primary.50",
                                            color: "primary.main",
                                            mb: 2.5
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 750,
                                            mb: 1
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        sx={{ lineHeight: 1.7 }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}