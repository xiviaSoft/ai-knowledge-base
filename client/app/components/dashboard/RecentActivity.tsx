"use client";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Skeleton,
    Typography,
    Link
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
interface Activity {
    type: string;
    title: string;
    time: string;
}
interface RecentActivityProps {
    activities: Activity[];
    loading: boolean;
}
export default function RecentActivity({
    activities,
    loading
}: RecentActivityProps) {
    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                backgroundColor: "#ffffff"
            }}
        >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2.5
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
                    >
                        Recent Activity
                    </Typography>
                    <Link
                        href="#"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#6366F1",
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            "&:hover": {
                                color: "#4F46E5"
                            }
                        }}
                    >
                        View all
                        <ChevronRightIcon sx={{ fontSize: 18, ml: 0.25 }} />
                    </Link>
                </Box>
                {loading ? (
                    <Box>
                        <Skeleton height={55} />
                        <Skeleton height={55} />
                        <Skeleton height={55} />
                    </Box>
                ) : activities.length === 0 ? (
                    <Typography color="text.secondary">
                        No recent activity.
                    </Typography>
                ) : (
                    <Box>
                        {activities.map((activity, index) => {
                            let Icon = DescriptionOutlinedIcon;
                            if (activity.type === "CHAT") {
                                Icon = ChatBubbleOutlineRoundedIcon;
                            }
                            if (activity.type === "MEMBER") {
                                Icon = PersonAddOutlinedIcon;
                            }
                            return (
                                <Box
                                    key={`${activity.type}-${activity.time}-${index}`}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        py: 1.5,
                                        borderBottom:
                                            index === activities.length - 1
                                                ? "none"
                                                : "1px solid #F1F5F9"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#F1F5F9"
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: 20,
                                                color: "text.secondary"
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                fontWeight: 600
                                            }}
                                        >
                                            {activity.title}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {new Date(
                                                activity.time
                                            ).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={
                                            activity.type === "DOCUMENT_UPLOAD"
                                                ? "Document"
                                                : activity.type === "CHAT"
                                                    ? "Chat"
                                                    : "Member"
                                        }
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}