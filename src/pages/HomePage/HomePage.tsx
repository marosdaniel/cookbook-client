import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { ENonProtectedRoutes } from '../../router/types';
import { Typography } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <Typography variant="h1">Home Page</Typography>
      <Link variant="button" component={RouterLink} to={ENonProtectedRoutes.SIGNIN}>
        sign in
      </Link>
    </div>
  );
};

export default HomePage;
