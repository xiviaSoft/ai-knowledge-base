"use client";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "../ui";

export default function QuickActions({ workspaceId }: any) {

    const router = useRouter();

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

                Quick Actions

            </Typography>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    flexWrap: "wrap"
                }}
            >

                <Button
                    startIcon={<UploadRoundedIcon />}
                    onClick={() =>
                        router.push(
                            `/workspace/${workspaceId}/documents`
                        )
                    }
                >

                    Upload Document

                </Button>

                <Button

                    startIcon={<ChatRoundedIcon />}

                    onClick={() =>

                        router.push(

                            `/workspace/${workspaceId}/chat`

                        )

                    }

                >

                    Start Chat

                </Button>

                <Button

                    startIcon={<PersonAddRoundedIcon />}

                    onClick={() =>

                        router.push(

                            `/workspace/${workspaceId}/members`

                        )

                    }

                >

                    Invite Member

                </Button>

                <Button

                    startIcon={<KeyRoundedIcon />}

                    onClick={() =>

                        router.push(

                            `/workspace/${workspaceId}/api-keys`

                        )

                    }

                >

                    Generate API Key

                </Button>

            </Stack>

        </Paper>

    );

}