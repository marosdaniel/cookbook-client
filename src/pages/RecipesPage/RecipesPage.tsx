import { useQuery } from '@apollo/client';
import { Box, Container, Grid, Typography } from '@mui/material';

import RecipeList from '../../components/Recipe/RecipeList';
import LoadingBar from '../../components/LoadingBar';
import { GET_RECIPES } from '../../service/graphql/recipe/getRecipes';
import ErrorMessage from '../../components/ErrorMessage';
import { TRecipe } from '../../store/Recipe/types';

const RecipesPage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const recipes: TRecipe[] = data?.getRecipes?.recipes || [];

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Typography variant="h3">Recipes Page</Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <div>Filter Bar</div>
          </Grid>
          <Grid item xs={12} md={8}>
            <RecipeList recipes={recipes} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipesPage;
