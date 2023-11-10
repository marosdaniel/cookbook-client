import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { ENonProtectedRoutes } from '../../router/types';
import { boxStyle } from './styles';

const NotFoundPage = () => {
  return (
    <Box sx={boxStyle}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
            <Button component={RouterLink} to={ENonProtectedRoutes.HOME} variant="contained">
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
