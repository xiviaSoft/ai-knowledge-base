import WorkspaceSidebar from "@/app/components/layout/WorkspaceSidebar";
import WorkspaceNavbar from "@/app/components/layout/WorkspaceNavbar";
import { Box } from "@mui/material";

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
                flexDirection: {
                    xs: "column",
                    md: "row"
                },
                width: "100%",
                minHeight: "100vh",
                height: "100vh",
                overflow: "hidden",
                bgcolor: "#F8FAFC"
            }}
        >
            <Box
                sx={{
                    minWidth: 0,
                    height: "100%",
                    overflow: "hidden",
                    display: {
                        xs: "none",
                        md: "block"
                    }
                }}
            >
                <WorkspaceSidebar />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minWidth: 0,
                    minHeight: 0,
                    width: "100%",
                    overflow: "hidden"
                }}
            >
                <Box
                    sx={{
                        flex: "0 0 72px",
                        minWidth: 0,
                        width: "100%",
                        overflow: "visible"
                    }}
                >
                    <WorkspaceNavbar workspaceId={workspaceId} />
                </Box>

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        minHeight: 0,
                        width: "100%",
                        height: 0,
                        overflow: "auto",
                        bgcolor: "#F8FAFC",
                        pt: {
                            xs: 7,
                            md: 9
                        }
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}