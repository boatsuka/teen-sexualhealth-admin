import * as React from "react";
import {
  Box,
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Home, School, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard Turck Car
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="หน้าหลัก" />
              </ListItem>
            </List>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to="/school">
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="โรงเรียน" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/school">
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="แบบเรียน" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
