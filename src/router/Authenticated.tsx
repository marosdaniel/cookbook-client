import React, { PropsWithChildren } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { ENonProtectedRoutes } from './types';
import { useAuthState } from '../store/Auth';

const Authenticated = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthState();
  console.log('isAuthenticated', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={ENonProtectedRoutes.SIGNIN} state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default Authenticated;
