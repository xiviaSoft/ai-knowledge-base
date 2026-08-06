"use client";

import {

    Paper,

    Typography,

    Stack,

    Chip,

    Divider

} from "@mui/material";

interface Activity {

    type: string;

    title: string;

    time: string;

}

interface RecentActivityProps {

    activities: Activity[];

}

export default function RecentActivity({

    activities

}: RecentActivityProps) {

    return (

        <Paper

            sx={{

                p: 3,

                borderRadius: 4

            }}

        >

            <Typography

                variant="h6"


                sx={{ mb: 3, fontWeight: 700 }}
            >

                Recent Activity

            </Typography>

            {

                activities.length === 0 ? (

                    <Typography

                        color="text.secondary"

                    >

                        No recent activity.

                    </Typography>

                ) : (

                    <Stack spacing={2}>

                        {

                            activities.map(

                                (activity, index) => (

                                    <div key={index}>

                                        <Stack
                                            direction="row"
                                            sx={{ justifyContent: "space-between", alignItems: "center" }}
                                        >

                                            <div>

                                                <Typography
                                                    sx={{ fontWeight: 600 }}

                                                >

                                                    {activity.title}

                                                </Typography>

                                                <Typography

                                                    variant="body2"

                                                    color="text.secondary"

                                                >

                                                    {

                                                        new Date(

                                                            activity.time

                                                        ).toLocaleString()

                                                    }

                                                </Typography>

                                            </div>

                                            <Chip

                                                label={activity.type}

                                                size="small"

                                            />

                                        </Stack>

                                        {

                                            index !== activities.length - 1 && (

                                                <Divider sx={{ mt: 2 }} />

                                            )

                                        }

                                    </div>

                                )

                            )

                        }

                    </Stack>

                )

            }

        </Paper>

    );

}