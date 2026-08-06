"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";

import { useRouter } from "next/navigation";

import ProtectedRoute from "../components/common/ProtectedRoute";
import WorkspaceCard from "../components/workspace/WorkspaceCard";
import CreateWorkspaceDialog from "../components/workspace/CreateWorkspaceDialog";

import { Button, EmptyState, Loader } from "../components/ui";

import workspaceService from "../services/workspace.service";

export default function DashboardPage() {
    const router = useRouter();
    const [workspaces, setWorkspaces] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadWorkspaces();
    }, []);

    async function loadWorkspaces() {
        try {
            setLoading(true)
            const response = await workspaceService.getAll();
            setWorkspaces(response.workspaces || []);
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    function openWorkspace(workspace: any) {
        router.push(`/workspace/${workspace.id}`);
    }

    if (loading) {
        return (
            <ProtectedRoute>
                <Loader />
            </ProtectedRoute>
        );
    }

    return (

        <ProtectedRoute>

            <Box
                sx={{
                    maxWidth: 1500,
                    mx: "auto",
                    px: { xs: 2, md: 4 },
                    py: 5
                }}
            >

                {/* Header */}

                <Box

                    sx={{

                        display: "flex",

                        flexDirection: "row",

                        justifyContent: "space-between",

                        alignItems: "center",

                        mb: 5,

                    }}

                >

                    <Box>

                        <Typography

                            variant="h4"

                            sx={{ fontWeight: 700 }}

                        >

                            My Workspaces

                        </Typography>

                        <Typography

                            color="text.secondary"

                            sx={{ mt: 1 }}

                        >

                            Manage your AI Knowledge Base workspaces.

                        </Typography>

                    </Box>

                    <Button

                        variant="contained"

                        startIcon={<AddRoundedIcon />}

                        onClick={() => setDialogOpen(true)}

                    >

                        Create Workspace

                    </Button>


                </Box>

                {/* Stats */}

                <Box

                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3,
                        mb: 5,
                    }}
                >

                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: "background.paper",
                            borderRadius: 4,
                            p: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}

                    >
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 700 }}
                            >

                                Welcome back 👋

                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >

                                Manage your workspaces, upload documents and chat with AI.

                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                color="text.secondary"
                            >
                                Total Workspaces
                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 700, mt: 1 }}
                            >
                                {workspaces.length}
                            </Typography>
                        </Box>

                    </Box>


                </Box>

                {/* Workspace List */}

                {

                    workspaces.length === 0 ? (

                        <EmptyState

                            title="No workspaces yet"

                            description="Create your first workspace to start uploading documents and chatting with AI."

                        />

                    ) : (

                        <Box

                            sx={{

                                display: "grid",

                                gridTemplateColumns: {

                                    xs: "1fr",

                                    sm: "repeat(2, minmax(0, 1fr))",

                                    lg: "repeat(3, minmax(0, 1fr))",

                                },

                                gap: 3,

                            }}

                        >

                            {

                                workspaces.map((workspace: any) => (

                                    <Box key={workspace.id}>

                                        <WorkspaceCard

                                            workspace={workspace}

                                            onOpen={openWorkspace}

                                        />

                                    </Box>

                                ))

                            }

                        </Box>

                    )

                }

                <CreateWorkspaceDialog

                    open={dialogOpen}

                    onClose={() => setDialogOpen(false)}

                    onCreated={loadWorkspaces}

                />

            </Box>

        </ProtectedRoute>

    );

}