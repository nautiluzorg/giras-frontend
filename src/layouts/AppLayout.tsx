import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleToggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        minHeight: 0,
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <AppSidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            top: 0,
            height: 64,
            minHeight: 64,
            maxHeight: 64,
            overflow: "hidden",
            background: "linear-gradient(180deg, #1e3a8a 0%, #2563eb 100%)",
            borderRadius: 0,
          }}
        >
          <Toolbar
            sx={{
              height: 64,
              minHeight: "64px !important",
            }}
          >
            {/* Toggle mobile drawer */}
            <IconButton
              edge="start"
              onClick={handleMobileOpen}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                mr: 2,
                color: "#fff",
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Toggle desktop sidebar collapse — muncul lagi kalau sidebar lagi hilang */}
            {collapsed && (
              <IconButton
                edge="start"
                onClick={handleToggleCollapse}
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  mr: 2,
                  color: "#fff",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 1,
                textShadow: "0 1px 2px rgba(0,0,0,0.15)",
              }}
            >
              GIRAS
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
              Admin
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid",
            borderColor: "divider",
            p: { xs: 2, md: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}