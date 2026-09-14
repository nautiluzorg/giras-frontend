import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const drawerContent = (
    <>
      <Box
        sx={{
          height: 64,
          minHeight: 64,
          maxHeight: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          background: "linear-gradient(180deg, #1e3a8a 0%, #2563eb 100%)",
          borderRadius: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 1,
            textShadow: "0 1px 2px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
          }}
        >
          GIRAS
        </Typography>

        {/* Toggle hanya tampil di desktop */}
        <IconButton
          onClick={onToggleCollapse}
          sx={{
            display: { xs: "none", md: "inline-flex" },
            color: "#fff",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <List>
          <ListItemButton
            component={NavLink}
            to="/"
            end
            onClick={onMobileClose}
            sx={{
              "&.active": {
                backgroundColor: "primary.light",
                color: "primary.dark",
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
              "&.active": {
                backgroundColor: "primary.light",
                color: "primary.dark",
              },
            }}
          >
            <ListItemText primary="Tryout" />
          </ListItemButton>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: collapsed ? 0 : drawerWidth,
          flexShrink: 0,
          overflow: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      borderRadius: 0,
      border: "none",
      transition: (theme) =>
        theme.transitions.create("transform", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      transform: collapsed ? "translateX(-100%)" : "translateX(0)",
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
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRadius: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}