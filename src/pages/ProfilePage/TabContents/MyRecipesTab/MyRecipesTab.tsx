import { useQuery } from '@apollo/client';

import { GET_RECIPES_BY_USER_NAME } from '../../../../service/graphql/recipe/getRecipes';
import { TRecipe } from '../../../../store/Recipe/types';
import { useAuthState } from '../../../../store/Auth';
import RecipeList from '../../../../components/Recipe/RecipeList';
import LoadingBar from '../../../../components/LoadingBar';
import ErrorMessage from '../../../../components/ErrorMessage';

const MyRecipesTab = () => {
  const { user } = useAuthState();
  const userName = user?.userName || '';
  const { loading, error, data } = useQuery(GET_RECIPES_BY_USER_NAME, {
    variables: { userName } as { userName: string },
  });

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const recipes: TRecipe[] = data?.getRecipesByUserName.recipes || [];

  return (
    <section id="my-recipes">
      {recipes?.length > 0 ? <RecipeList recipes={recipes} /> : <div>You haven't added any recipes</div>}
    </section>
  );
};

export default MyRecipesTab;
