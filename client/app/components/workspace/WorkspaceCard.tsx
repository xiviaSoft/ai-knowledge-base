"use client";

import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Chip
} from "@mui/material";

import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { Button } from "../ui";

export default function WorkspaceCard({

    workspace,

    onOpen

}: any) {

    return (

        <Card

            sx={{

                borderRadius: 4,

                transition: ".25s",

                cursor: "pointer",

                border: "1px solid",

                borderColor: "divider",

                "&:hover": {

                    transform: "translateY(-6px)",

                    boxShadow: 8

                }

            }}

        >

            <CardContent sx={{ p: 3 }}>

                <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >

                    <Box

                        sx={{

                            width: 56,

                            height: 56,

                            borderRadius: 3,

                            bgcolor: "primary.main",

                            color: "#fff",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center"

                        }}

                    >

                        <FolderRoundedIcon />

                    </Box>

                    <Chip

                        label={workspace.plan}

                        color={

                            workspace.plan === "PRO"

                                ? "secondary"

                                : "primary"

                        }

                    />

                </Stack>

                <Typography
                    variant="h5"
                    sx={{ mt: 3, fontWeight: 700 }}
                >

                    {workspace.name}

                </Typography>

                <Typography
                    sx={{ mt: 1, color: "text.secondary" }}
                >

                    {workspace.slug}

                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 4, alignItems: "center" }}
                >

                    <AccessTimeRoundedIcon

                        fontSize="small"

                        color="disabled"

                    />

                    <Typography

                        variant="body2"

                        color="text.secondary"

                    >

                        Updated{" "}

                        {new Date(

                            workspace.updated_at

                        ).toLocaleDateString()}

                    </Typography>

                </Stack>

                <Button

                    fullWidth

                    variant="contained"

                    endIcon={<ArrowForwardRoundedIcon />}

                    sx={{

                        mt: 4

                    }}

                    onClick={() => onOpen(workspace)}

                >

                    Open Workspace

                </Button>

            </CardContent>

        </Card>

    );

}