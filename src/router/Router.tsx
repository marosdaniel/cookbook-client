import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import LoadingBar from '../components/LoadingBar';
import AppBar from '../components/AppBar/';
import PageWrapper from '../components/PageWrapper';
import { nonProtectedRoutes } from './nonProtectedRoutes';
import { protectedRoutes } from './protectedRoutes';
import Authenticated from './Authenticated';
import { ENonProtectedRoutes } from './types';

const NotFound = loadable(() => import('../pages/NotFoundPage'), {
  fallback: <LoadingBar />,
});

export const router = createBrowserRouter([
  ...nonProtectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <>
        {path !== ENonProtectedRoutes.SIGNIN ? (
          <>
            <AppBar />
            <PageWrapper>
              <Component />
            </PageWrapper>
          </>
        ) : (
          <Component />
        )}
      </>
    ),
  })),
  ...protectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <Authenticated>
        <AppBar />
        <PageWrapper>
          <Component />
        </PageWrapper>
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
