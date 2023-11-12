import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { GET_RECIPES } from '../../../service/graphql/recipe/getRecipes';
import LoadingBar from '../../../components/LoadingBar';
import RecipeCard from '../../../components/RecipeCard';
import { TRecipe } from '../../../store/Recipe/types';
import { gridStyles } from './styles';

const Recipes = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <LoadingBar />;
  if (error) return <div>Error :(</div>;

  const recipes: TRecipe[] = data?.getRecipes?.recipes || [];

  return (
    <Grid sx={gridStyles}>
      {recipes.map((recipe: TRecipe) => (
        <RecipeCard
          key={recipe._id}
          title={recipe.title}
          description={recipe.description}
          author={recipe.author}
          createdAt={recipe.createdAt}
          createdBy={recipe.createdBy}
          ingredients={recipe.ingredients}
          preparationSteps={recipe.preparationSteps}
          updatedAt={recipe.updatedAt}
          id={recipe._id}
        />
      ))}
    </Grid>
  );
};

export default Recipes;
