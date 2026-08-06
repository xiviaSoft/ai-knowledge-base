"use client";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import StatsCard from "../dashboard/StatsCard";
import Grid from "@mui/material/Grid";
export default function OverviewStats({stats}: any) {

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

                    title="Members"

                    value={stats.members}

                    icon={<GroupsRoundedIcon />}

                    color="#F59E0B"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <StatsCard

                    title="Chats"

                    value={stats.chats}

                    icon={<ChatRoundedIcon />}

                    color="#10B981"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <StatsCard

                    title="API Keys"

                    value={stats.apiKeys}

                    icon={<KeyRoundedIcon />}

                    color="#7C3AED"

                />

            </Grid>

        </Grid>

    );

}