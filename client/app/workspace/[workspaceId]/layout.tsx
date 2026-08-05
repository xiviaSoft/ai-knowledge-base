

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

    params: {

        workspaceId: string

    }

}) {

    return (

        <>

            <WorkspaceNavbar />

            <WorkspaceSidebar

                workspaceId={params.workspaceId}

            />

            <Box

                sx={{

                    ml: "260px",

                    p: 4

                }}

            >

                <Toolbar />

                {children}

            </Box>

        </>

    );

}