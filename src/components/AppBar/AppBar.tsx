import { PropsWithChildren, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import { Avatar, Link } from '@mui/material';

import { useAuthState } from '../../store/Auth';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';
import { AppBarProps } from './types';
import { getAvatarName, useBottomMenuItems, useTopMenuItems } from './utils';
import { getListItemStyles } from './styles';
import myTheme from '../../theme';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MuiBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function AppBar({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthState();
  const [open, setOpen] = useState(false);
  const bottomMenuItems = useBottomMenuItems();
  const topMenuItems = useTopMenuItems();

  const avatarName = getAvatarName(user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigateTo = (path: ENonProtectedRoutes | EProtectedRoutes) => {
    navigate(path);
  };

  return (
    <Box display="flex">
      <MuiBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Where Recipes Turn into Magic!
          </Typography>
          {!isAuthenticated ? (
            <Link
              component={RouterLink}
              to={ENonProtectedRoutes.SIGNIN}
              variant="h6"
              noWrap
              sx={{
                color: 'white',
                marginLeft: 'auto',
              }}
            >
              Login
            </Link>
          ) : (
            <Avatar sx={{ marginLeft: 'auto', width: 42, height: 42 }}>{avatarName}</Avatar>
          )}
        </Toolbar>
      </MuiBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h5" sx={{ margin: '0 auto', color: myTheme.palette.primary.main }}>
            CookBook
          </Typography>
          <IconButton onClick={handleDrawerClose}>{<ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {topMenuItems.map(item => (
            <Tooltip title={item.name} placement="right" key={item.key}>
              <ListItem
                key={item.key}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => {
                  return item.path && navigateTo(item.path);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <item.iconComponent />
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          {bottomMenuItems.map(item =>
            !item.hidden ? (
              <Tooltip title={item.name} placement="right" key={item.key}>
                <ListItem
                  disabled={item.disabled}
                  key={item.key}
                  disablePadding
                  sx={getListItemStyles(item.disabled)}
                  onClick={() => (item.path ? navigateTo(item.path) : item.action?.())}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <item.iconComponent />
                    </ListItemIcon>
                    <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ) : null,
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
