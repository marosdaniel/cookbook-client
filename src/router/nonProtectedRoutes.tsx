import loadable from '@loadable/component';
import LoadingBar from '../components/LoadingBar';

import { ENonProtectedRoutes } from './types';

const Home = loadable(() => import('../pages/HomePage'), {
  fallback: <LoadingBar />,
});
const Signin = loadable(() => import('../pages/SigninPage'), {
  fallback: <LoadingBar />,
});
const RecipeDetails = loadable(() => import('../pages/RecipeDetailsPage'), {
  fallback: <LoadingBar />,
});
const Recipes = loadable(() => import('../pages/RecipesPage'), {
  fallback: <LoadingBar />,
});
const User = loadable(() => import('../pages/UserPage'), {
  fallback: <LoadingBar />,
});
const Blogs = loadable(() => import('../pages/BlogsPage'), {
  fallback: <LoadingBar />,
});
const BlogDetails = loadable(() => import('../pages/BlogDetailsPage'), {
  fallback: <LoadingBar />,
});
const TipsAndTricks = loadable(() => import('../pages/TipsAndTricksPage'), {
  fallback: <LoadingBar />,
});

export const nonProtectedRoutes = [
  {
    path: ENonProtectedRoutes.HOME,
    component: Home,
  },
  {
    path: ENonProtectedRoutes.SIGNIN,
    component: Signin,
  },
  {
    path: `${ENonProtectedRoutes.RECIPES}/:id/*`,
    component: RecipeDetails,
  },
  {
    path: ENonProtectedRoutes.RECIPES,
    component: Recipes,
  },
  {
    path: `${ENonProtectedRoutes.USERS}/:userName/*`,
    component: User,
  },
  {
    path: `${ENonProtectedRoutes.BLOG_DETAILS}/*`,
    component: BlogDetails,
  },
  {
    path: ENonProtectedRoutes.BLOGS,
    component: Blogs,
  },
  {
    path: ENonProtectedRoutes.TIPS_AND_TRICKS,
    component: TipsAndTricks,
  },
];
