import loadable from "@loadable/component";
import LoadingBar from "../components/LoadingBar";
import { EProtectedRoutes } from "./types";

const Profile = loadable(() => import("../pages/ProfilePage"), {
  fallback: <LoadingBar />,
});

export const protectedRoutes = [
  {
    path: EProtectedRoutes.PROFILE,
    component: Profile,
  },
];
