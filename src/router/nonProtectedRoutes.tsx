import loadable from "@loadable/component";
import LoadingBar from "../components/LoadingBar";

import { ENonProtectedRoutes } from "./types";

const Home = loadable(() => import("../pages/HomePage"), {
  fallback: <LoadingBar />,
});
const Signin = loadable(() => import("../pages/SigninPage"), {
  fallback: <LoadingBar />,
});
const RecipeDetails = loadable(() => import("../pages/RecipeDetailsPage"), {
  fallback: <LoadingBar />,
});
const Recipes = loadable(() => import("../pages/RecipesPage"), {
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
];
