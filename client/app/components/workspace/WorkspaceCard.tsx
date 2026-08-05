"use client";

import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack
} from "@mui/material";

export default function WorkspaceCard({

    workspace,

    onOpen

}: any) {

    return (

        <Card>

            <CardContent>

                <Typography variant="h6">

                    {workspace.name}

                </Typography>

                <Typography>

                    Plan: {workspace.plan}

                </Typography>

                <Typography>

                    Slug: {workspace.slug}

                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{mt:2}}
                >

                    <Button
                        variant="contained"
                        onClick={() => onOpen(workspace)}
                    >

                        Open

                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );

}