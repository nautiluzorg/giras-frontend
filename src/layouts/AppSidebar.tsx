
import { NavLink } from 'react-router-dom';

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const drawerContent = (
    <>
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          px: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h6"
          sx={{fontWeight:700}}
          color="primary"
        >
          GIRAS
        </Typography>
      </Box>

      <List>
        <ListItemButton
          component={NavLink}
          to="/"
          end
          onClick={onMobileClose}
          sx={{
            '&.active': {
              backgroundColor: 'primary.light',
              color: 'primary.dark',
            },
          }}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/exams"
          onClick={onMobileClose}
          sx={{
            '&.active': {
              backgroundColor: 'primary.light',
              color: 'primary.dark',
            },
          }}
        >
          <ListItemText primary="Tryout" />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          width: drawerWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}