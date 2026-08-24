"use client";
import {
    Box,
    Card,
    CardContent,
    Skeleton,
    Typography
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
const cards = [
    {
        key: "total",
        title: "Total Documents",
        icon: DescriptionOutlinedIcon
    },
    {
        key: "ready",
        title: "Ready Documents",
        icon: CheckCircleOutlineRoundedIcon
    },
    {
        key: "processing",
        title: "Processing",
        icon: AutorenewRoundedIcon
    },
    {
        key: "failed",
        title: "Failed Documents",
        icon: ErrorOutlineRoundedIcon
    },
    {
        key: "conversations",
        title: "Conversations",
        icon: ChatBubbleOutlineRoundedIcon
    },
    {
        key: "members",
        title: "Members",
        icon: PeopleOutlineRoundedIcon
    }
];
interface DashboardStatsProps {
    data: any;
    loading: boolean;
}
export default function DashboardStats({
    data,
    loading
}: DashboardStatsProps) {
    const values: Record<string, number> = {
        total: data?.documents?.total ?? 0,
        ready: data?.documents?.ready ?? 0,
        processing: data?.documents?.processing ?? 0,
        failed: data?.documents?.failed ?? 0,
        conversations: data?.conversations ?? 0,
        members: data?.members ?? 0
    };
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)"
                },
                gap: 2
            }}
        >
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Card
                        key={card.key}
                        elevation={0}
                        sx={{
                            border: "1px solid #E5E7EB",
                            borderRadius: 3,
                            backgroundColor: "#FFFFFF"
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: 2
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 600, }}
                                >
                                    {card.title}
                                </Typography>
                                <Icon
                                    sx={{
                                        fontSize: 22,
                                        color: "text.secondary"
                                    }}
                                />
                            </Box>
                            {loading ? (
                                <Skeleton
                                    variant="text"
                                    width={70}
                                    height={48}
                                />
                            ) : (
                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: 700 }}
                                >
                                    {values[card.key]}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
}