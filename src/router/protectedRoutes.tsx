import loadable from '@loadable/component';
import LoadingBar from '../components/LoadingBar';
import { EProtectedRoutes } from './types';

const Profile = loadable(() => import('../pages/ProfilePage'), {
  fallback: <LoadingBar />,
});
const NewRecipe = loadable(() => import('../pages/NewRecipePage'), {
  fallback: <LoadingBar />,
});
const AdminPage = loadable(() => import('../pages/AdminPage'), {
  fallback: <LoadingBar />,
});

export const protectedRoutes = [
  {
    path: EProtectedRoutes.ME,
    component: Profile,
  },
  {
    path: EProtectedRoutes.PROFILE,
    component: Profile,
  },
  {
    path: EProtectedRoutes.MY_RECIPES,
    component: Profile,
  },
  {
    path: EProtectedRoutes.FAVORITES,
    component: Profile,
  },
  {
    path: EProtectedRoutes.NEW_RECIPE,
    component: NewRecipe,
  },
  {
    path: EProtectedRoutes.ADMIN,
    component: AdminPage,
    adminOnly: true,
  },
  {
    path: EProtectedRoutes.ADMIN_CATEGORIES,
    component: AdminPage,
    adminOnly: true,
  },
  {
    path: EProtectedRoutes.ADMIN_LABELS,
    component: AdminPage,
    adminOnly: true,
  },
  {
    path: EProtectedRoutes.ADMIN_UNITS,
    component: AdminPage,
    adminOnly: true,
  },
  {
    path: EProtectedRoutes.ADMIN_USERS,
    component: AdminPage,
    adminOnly: true,
  },
];
