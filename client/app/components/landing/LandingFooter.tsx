import {
    Box,
    Container,
    Stack,
    Typography
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export default function LandingFooter() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "background.paper",
                borderTop: "1px solid",
                borderColor: "divider"
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    sx={{ py: 4, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: 'center' }}
                    >
                        <AutoAwesomeRoundedIcon
                            sx={{
                                color: "primary.main",
                                fontSize: 20
                            }}
                        />

                        <Typography sx={{ fontWeight: 750 }}>
                            AI Knowledge Base
                        </Typography>
                    </Stack>

                    <Typography
                        color="text.secondary"
                        sx={{ fontSize: 13 }}
                    >
                        © 2026 AI Knowledge Base. All rights reserved.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}