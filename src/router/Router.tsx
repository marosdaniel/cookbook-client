import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import loadable from '@loadable/component';
import LoadingBar from '../components/LoadingBar';

import { nonProtectedRoutes } from './nonProtectedRoutes';
import { protectedRoutes } from './protectedRoutes';
import Authenticated from './Authenticated';

const NotFound = loadable(() => import('../pages/NotFoundPage'), {
  fallback: <LoadingBar />,
});

export const router = createBrowserRouter([
  ...nonProtectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <>
        {/* <Navbar /> */}
        <Component />
      </>
    ),
  })),
  ...protectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <Authenticated>
        {/* <Navbar /> */}
        <Component />
      </Authenticated>
    ),
  })),
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppNavigation = () => <RouterProvider router={router} />;

export default AppNavigation;
