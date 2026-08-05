"use client";

import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/common/ProtectedRoute";
import WorkspaceCard from "../components/workspace/WorkspaceCard";
import workspaceService from "../services/workspace.service";
import CreateWorkspaceDialog from "../components/workspace/CreateWorkspaceDialog";
export default function DashboardPage() {

    const [workspaces, setWorkspaces] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadWorkspaces();
    }, []);

    async function loadWorkspaces() {
        const response = await workspaceService.getAll();
        setWorkspaces(response.workspaces);
    }

    function openWorkspace(workspace: any) {
        router.push(`/workspace/${workspace.id}`);
    }

    return (

        <ProtectedRoute>

            <Box sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    sx={{ mb: 4 }}
                >

                    My Workspaces

                </Typography>
                <Button
                    variant="contained"
                    sx={{ mb: 3 }}
                    onClick={() => setDialogOpen(true)}
                >
                    New Workspace
                </Button>


                {workspaces.length === 0 ? (

                    <Typography
                        variant="body1"
                        sx={{ mt: 2 }}
                    >
                        No workspaces found.
                    </Typography>
                ) : (

                    <Grid
                        container
                        spacing={3}
                    >
                        { workspaces?.map((workspace: any) => (

                                <Grid
                                    size={{ xs: 12, md: 6, lg: 4 }}
                                    key={workspace.id}
                                >

                                    <WorkspaceCard

                                        workspace={workspace}

                                        onOpen={openWorkspace}

                                    />

                                </Grid>

                            ))
                        }
                    </Grid>
                )}





                <CreateWorkspaceDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onCreated={loadWorkspaces}
                />
            </Box >

        </ProtectedRoute >

    );

}