import React, { PropsWithChildren } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { ENonProtectedRoutes, EProtectedRoutes } from './types';
import { useAuthState } from '../store/Auth';
import { ERole } from '../store/Auth/types';

const Authenticated = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthState();

  const isAdmin = user?.role === ERole.ADMIN;

  if (!isAuthenticated) {
    return <Navigate to={ENonProtectedRoutes.SIGNIN} state={{ from: location }} replace />;
  }

  if (isAdmin && location.pathname === EProtectedRoutes.ADMIN) {
    return <>{children}</>;
  } else if (location.pathname === EProtectedRoutes.ADMIN) {
    return <Navigate to={ENonProtectedRoutes.HOME} />;
  }

  return <>{children}</>;
};

export default Authenticated;
