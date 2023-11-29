import RecipeList from '../../../../components/Recipe/RecipeList';
import { useAuthState } from '../../../../store/Auth';

const FavoritesTab = () => {
  const { user } = useAuthState();

  const favoriteRecipes = user?.favoriteRecipes || [];

  return (
    <section id="favorite-recipes">
      {favoriteRecipes?.length > 0 ? <RecipeList recipes={favoriteRecipes} /> : <div>No favorite recipes</div>}
    </section>
  );
};

export default FavoritesTab;
