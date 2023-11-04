import { useAuthState } from './../../store/Auth/selectors';
import { ENonProtectedRoutes, EProtectedRoutes } from '../../router/types';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/Auth/auth';
import { TUser } from '../../store/Auth/types';

export const topMenuItems = [
  {
    name: 'Home',
    path: ENonProtectedRoutes.HOME,
    icon: 'home',
    disabled: false,
    key: 'home',
  },
  {
    name: 'Recipes',
    path: ENonProtectedRoutes.RECIPES,
    icon: 'home',
    disabled: false,
    key: 'recipes',
  },
];

export const useBottomMenuItems = () => {
  const { isAuthenticated } = useAuthState();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log('logout');
  };
  return [
    {
      name: 'Profile',
      path: EProtectedRoutes.PROFILE,
      icon: 'home',
      disabled: !isAuthenticated,
      key: 'profile',
    },
    {
      name: 'My Recipes',
      path: EProtectedRoutes.MY_RECIPES,
      icon: 'home',
      disabled: !isAuthenticated,
      key: 'my-recipes',
    },
    {
      name: 'New Recipe',
      path: EProtectedRoutes.NEW_RECIPE,
      icon: 'home',
      disabled: !isAuthenticated,
      key: 'new-recipe',
    },
    {
      name: 'Logout',
      action: handleLogout,
      icon: 'home',
      disabled: !isAuthenticated,
      key: 'logout',
    },
  ];
};

export const getAvatarName = (user: TUser | null) => {
  return user?.locale === 'hu-HU'
    ? `${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`
    : `${user?.lastName.charAt(0)} ${user?.firstName.charAt(0)}` || null;
};
