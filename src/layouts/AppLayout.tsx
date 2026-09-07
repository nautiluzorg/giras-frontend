import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import AppSidebar from './AppSidebar';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100dvh',
        minHeight: 0,
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      <AppSidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{ top: 0 }}
        >
          <Toolbar
            sx={{
              minHeight: 64,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <IconButton
              edge="start"
              onClick={handleMobileOpen}
              sx={{
                display: {
                  xs: 'inline-flex',
                  md: 'none',
                },
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="h1"
              color="primary"
              
              sx={{fontWeight:700}}
            >
              GIRAS
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Admin
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            p: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}