import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { ENonProtectedRoutes } from '../../router/types';

const HomePage = () => {
  return (
    <div>
      <Link variant="button" component={RouterLink} to={ENonProtectedRoutes.SIGNIN}>
        sign in
      </Link>
    </div>
  );
};

export default HomePage;
