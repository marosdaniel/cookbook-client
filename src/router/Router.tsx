import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import LoadingBar from '../components/LoadingBar';
import AppBar from '../components/AppBar/';
import Footer from '../components/Footer';
import PageWrapper from '../components/stylingComponents/PageWrapper';
import { nonProtectedRoutes } from './nonProtectedRoutes';
import { protectedRoutes } from './protectedRoutes';
import Authenticated from './Authenticated';
import { ENonProtectedRoutes } from './types';

const NotFound = loadable(() => import('../pages/NotFoundPage'), {
  fallback: <LoadingBar />,
});

const isPathWithoutAppBar = (path: string) =>
  path !== ENonProtectedRoutes.SIGNIN &&
  path !== ENonProtectedRoutes.RESET_PASSWORD &&
  path !== ENonProtectedRoutes.NEW_PASSWORD;

export const router = createBrowserRouter([
  ...nonProtectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <>
        {isPathWithoutAppBar(path) ? (
          <>
            <AppBar />
            <PageWrapper>
              <Component />
              <Footer />
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
          <Footer />
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
