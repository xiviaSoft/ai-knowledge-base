"use client";

import { Box } from "@mui/material";
import SidebarHeader from "./SidebarHeader";
import SidebarHistory from "./SidebarHistory";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar({ open }) {
  return (
    <Box
      sx={{
        width: open ? 300 : 0,
        overflow: "hidden",
        transition: "width .3s ease",
        bgcolor: "secondary.main",
        height: "100vh",
        borderRight: open ? "1px solid rgba(255,255,255,.08)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {open && (
        <>
          <SidebarHeader />
          <SidebarHistory />
          <SidebarFooter />
        </>
      )}
    </Box>
  );
}