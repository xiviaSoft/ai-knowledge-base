"use client";

import {
  AppBar,
  Avatar,
  Box,
  Chip,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function Header({ open, setOpen }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(12px)",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 80,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip title={open ? "Collapse Sidebar" : "Expand Sidebar"}>
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                },
              }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 52,
              height: 52,
              boxShadow: 3,
            }}
          >
            <SmartToyIcon />
          </Avatar>

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              AI Knowledge Assistant
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label="Wikipedia"
                color="primary"
                size="small"
                variant="filled"
              />

              <Chip
                label="Pinecone"
                color="success"
                size="small"
              />

              <Chip
                label="Gemini"
                color="secondary"
                size="small"
              />
            </Box>
          </Box>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Tooltip title="Notifications">
            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                },
              }}
            >
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Dark Mode">
            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                },
              }}
            >
              <DarkModeOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                width: 42,
                height: 42,
                cursor: "pointer",
                transition: ".25s",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              B
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}