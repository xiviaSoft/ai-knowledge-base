"use client";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Skeleton,
    Typography
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
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
                borderRadius: 3
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{ mb: 3, fontWeight:700}}
                >
                    Recent Activity
                </Typography>
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
                                                fontWeight:600
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