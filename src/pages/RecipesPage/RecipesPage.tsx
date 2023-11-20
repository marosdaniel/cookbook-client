import { Box, Container, Grid, Typography } from '@mui/material';
import Recipes from './Recipes';

const RecipesPage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Typography variant="h3">Recipes Page</Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <div>Filter Bar</div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Recipes />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipesPage;
