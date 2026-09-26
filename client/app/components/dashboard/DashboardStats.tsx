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
        icon: DescriptionOutlinedIcon,
        bgColor: "#E8D5F0",
        iconColor: "#A855F7"
    },
    {
        key: "ready",
        title: "Ready Documents",
        icon: CheckCircleOutlineRoundedIcon,
        bgColor: "#D4EDDA",
        iconColor: "#16A34A"
    },
    {
        key: "processing",
        title: "Processing",
        icon: AutorenewRoundedIcon,
        bgColor: "#FFE5CC",
        iconColor: "#EA580C"
    },
    {
        key: "failed",
        title: "Failed Documents",
        icon: ErrorOutlineRoundedIcon,
        bgColor: "#FFD7D7",
        iconColor: "#DC2626"
    },
    {
        key: "conversations",
        title: "Conversations",
        icon: ChatBubbleOutlineRoundedIcon,
        bgColor: "#D1E7F0",
        iconColor: "#0284C7"
    },
    {
        key: "members",
        title: "Members",
        icon: PeopleOutlineRoundedIcon,
        bgColor: "#E8D5F0",
        iconColor: "#A855F7"
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
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(3, minmax(0, 1fr))"
                },
                gap: 2.5,
                alignItems: "stretch"
            }}
        >
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Card
                        key={card.key}
                        elevation={0}
                        sx={{
                            border: "none",
                            borderRadius: 3,
                            backgroundColor: card.bgColor,
                            minHeight: { xs: 148, md: 162 }
                        }}
                    >
                        <CardContent
                            sx={{
                                p: 2.5,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 2
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#111827",
                                        letterSpacing: "-0.01em"
                                    }}
                                >
                                    {card.title}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        bgcolor: "rgba(255,255,255,0.35)"
                                    }}
                                >
                                    <Icon
                                        sx={{
                                            fontSize: 22,
                                            color: card.iconColor
                                        }}
                                    />
                                </Box>
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
                                    sx={{
                                        fontWeight: 700,
                                        color: "#111827",
                                        lineHeight: 1.1,
                                        letterSpacing: "-0.04em"
                                    }}
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