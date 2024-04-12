import loadable from '@loadable/component';
import LoadingBar from '../components/LoadingBar';

import { ENonProtectedRoutes } from './types';

const Home = loadable(() => import('../pages/HomePage'), {
  fallback: <LoadingBar />,
});
const Signin = loadable(() => import('../pages/SigninPage'), {
  fallback: <LoadingBar />,
});
const ResetPassword = loadable(() => import('../pages/ResetPasswordPage'), {
  fallback: <LoadingBar />,
});
const NewPassword = loadable(() => import('../pages/NewPasswordPage'), {
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
const PrivacyPolicy = loadable(() => import('../pages/PrivacyPage'), {
  fallback: <LoadingBar />,
});
const CookiePolicy = loadable(() => import('../pages/CookiePolicyPage'), {
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
    path: ENonProtectedRoutes.RESET_PASSWORD,
    component: ResetPassword,
  },
  {
    path: ENonProtectedRoutes.RESET_PASSWORD,
    component: NewPassword,
  },
  {
    path: ENonProtectedRoutes.NEW_PASSWORD,
    component: NewPassword,
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
  {
    path: ENonProtectedRoutes.PRIVACY_POLICY,
    component: PrivacyPolicy,
  },
  {
    path: ENonProtectedRoutes.COOKIE_POLICY,
    component: CookiePolicy,
  },
];
