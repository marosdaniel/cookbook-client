import React, { PropsWithChildren } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { ENonProtectedRoutes } from "./types";

const Authenticated = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token"); // TODO: get it from redux store
  if (!isLoggedIn) {
    return (
      <Navigate
        to={ENonProtectedRoutes.SIGNIN}
        state={{ from: location }}
        replace
      />
    );
  }
  return <>{children}</>;
};

export default Authenticated;
