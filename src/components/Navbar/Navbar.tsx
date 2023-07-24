import React, { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useGlobalState } from "../../store/Global";
import { Avatar } from "@mui/material";
import { ENonProtectedRoutes, EProtectedRoutes } from "../../router/types";

const Navbar = () => {
  const { isLoggedIn } = useGlobalState();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const logout = () => {
    console.log("logged out");
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserSettingsClick = (setting: any) => {
    if (setting.action) {
      setting.action();
    } else {
      navigate(setting.to);
    }
    handleCloseUserMenu();
  };

  const navBarItems = [
    {
      name: "Home",
      to: ENonProtectedRoutes.HOME,
      disabled: false,
    },
    {
      name: "Recipes",
      to: ENonProtectedRoutes.RECIPES,
      disabled: false,
    },
    {
      name: "Articles",
      to: ENonProtectedRoutes.ARTICLES,
      disabled: true,
    },
    {
      name: "Contact us",
      to: ENonProtectedRoutes.CONTACT_US,
      disabled: true,
    },
    {
      name: "New Recipe",
      to: EProtectedRoutes.NEW_RECIPE,
      disabled: true,
      isProtected: true,
    },
  ];

  const userSettings = [
    {
      name: "Profile",
      to: EProtectedRoutes.PROFILE,
    },
    {
      name: "My Recipes",
      to: EProtectedRoutes.MY_RECIPES,
    },
    {
      name: "Logout",
      action: logout,
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navBarItems.map((page) => {
                if (page.isProtected && !isLoggedIn) {
                  return null;
                }
                return (
                  <MenuItem
                    key={page.name}
                    disabled={page.disabled}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.to);
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                );
              })}
              ;
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navBarItems.map((page) => {
              if (page.isProtected && !isLoggedIn) {
                return null;
              }
              return (
                <Button
                  key={page.name}
                  disabled={page.disabled}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.to);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userSettings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onMouseDown={() => handleUserSettingsClick(setting)}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate(ENonProtectedRoutes.SIGNIN)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Signin
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
