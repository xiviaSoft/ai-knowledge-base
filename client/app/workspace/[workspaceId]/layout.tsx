import WorkspaceNavbar from "@/app/components/layout/WorkspaceNavbar";
import WorkspaceSidebar from "@/app/components/layout/WorkspaceSidebar";
import {
    Box,
    Toolbar
} from "@mui/material";

export default async function WorkspaceLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{
        workspaceId: string;
    }>;
}) {
    const { workspaceId } = await params;

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
                bgcolor: "#F8FAFC"
            }}
        >
            <WorkspaceNavbar
                workspaceId={workspaceId}
            />

            <WorkspaceSidebar />

            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    overflow: "hidden"
                }}
            >
                <Toolbar />

                <Box
                    sx={{
                        flex: 1,
                        overflow: "auto",
                        bgcolor: "#F8FAFC"
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}