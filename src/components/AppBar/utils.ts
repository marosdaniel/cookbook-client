import { ERole, TUser } from './../../store/Auth/types';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CreateIcon from '@mui/icons-material/Create';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useAuthState } from './../../store/Auth/selectors';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';
import { logout } from '../../store/Auth/auth';

import { IBottomMenuItem, ITopMenuItem } from './types';
import { useAppDispatch } from '../../store/hooks';

export const useTopMenuItems = (): ITopMenuItem[] => {
  return [
    {
      name: 'Recipes',
      path: ENonProtectedRoutes.RECIPES,
      iconComponent: MenuBookIcon,
      hidden: false,
      key: 'recipes',
      disabled: false,
    },
    {
      name: 'Blogs',
      path: ENonProtectedRoutes.BLOGS,
      iconComponent: RssFeedIcon,
      hidden: false,
      key: 'blogs',
      disabled: false,
    },
    {
      name: 'Tips and Tricks',
      path: ENonProtectedRoutes.TIPS_AND_TRICKS,
      iconComponent: AutoFixHighIcon,
      hidden: false,
      key: 'tips-and-tricks',
      disabled: false,
    },
  ];
};

export const useBottomMenuItems = (): IBottomMenuItem[] => {
  const { isAuthenticated, user } = useAuthState();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return [
    {
      name: 'Admin',
      path: EProtectedRoutes.ADMIN,
      iconComponent: AdminPanelSettingsIcon,
      disabled: user?.role !== ERole.ADMIN,
      key: 'admin',
      hidden: user?.role !== ERole.ADMIN,
    },
    {
      name: 'Profile',
      path: EProtectedRoutes.PROFILE,
      iconComponent: AccountBoxIcon,
      disabled: false,
      key: 'profile',
      hidden: !isAuthenticated,
    },
    {
      name: 'My Recipes',
      path: EProtectedRoutes.MY_RECIPES,
      iconComponent: LocalDiningIcon,
      hidden: !isAuthenticated,
      key: 'my-recipes',
      disabled: false,
    },
    {
      name: 'New Recipe',
      path: EProtectedRoutes.NEW_RECIPE,
      iconComponent: CreateIcon,
      hidden: !isAuthenticated,
      key: 'new-recipe',
      disabled: false,
    },
    {
      name: 'Logout',
      action: handleLogout,
      iconComponent: LogoutIcon,
      hidden: !isAuthenticated,
      key: 'logout',
      disabled: false,
    },
  ];
};

export const getAvatarName = (user: TUser | null) => {
  return user?.locale !== 'hu-HU'
    ? `${user?.firstName.charAt(0)} ${user?.lastName.charAt(0)}`
    : `${user?.lastName.charAt(0)} ${user?.firstName.charAt(0)}` || 'J D';
};
