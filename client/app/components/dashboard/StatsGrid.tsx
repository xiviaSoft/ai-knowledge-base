"use client";

import Grid from "@mui/material/Grid";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";

import StatsCard from "./StatsCard";

export default function StatsGrid({

    stats

}: any) {

    return (

        <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatsCard
                    title="Documents"
                    value={stats.documents}
                    icon={<DescriptionRoundedIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatsCard
                    title="Chats"
                    value={stats.chats}
                    color="#10B981"
                    icon={<ChatRoundedIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatsCard
                    title="Members"
                    value={stats.members}
                    color="#F59E0B"
                    icon={<GroupsRoundedIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatsCard
                    title="API Keys"
                    value={stats.apiKeys}
                    color="#7C3AED"
                    icon={<KeyRoundedIcon />}
                />
            </Grid>

        </Grid>

    );

}