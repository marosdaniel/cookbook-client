import { Typography } from '@mui/material';
import RecipeList from '../../../../components/Recipe/RecipeList';
import { useAuthState } from '../../../../store/Auth';

const FavoritesTab = () => {
  const { user } = useAuthState();

  const favoriteRecipes = user?.favoriteRecipes || [];

  return (
    <section id="favorite-recipes">
      {favoriteRecipes?.length > 0 ? (
        <RecipeList recipes={favoriteRecipes} />
      ) : (
        <Typography variant="h4">No favorite recipes</Typography>
      )}
    </section>
  );
};

export default FavoritesTab;
