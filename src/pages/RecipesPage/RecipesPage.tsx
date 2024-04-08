import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';

import { GET_RECIPES } from '../../service/graphql/recipe/getRecipes';
import { TRecipe } from '../../store/Recipe/types';
import RecipeList from '../../components/Recipe/RecipeList';
import LoadingBar from '../../components/LoadingBar';
import ErrorMessage from '../../components/ErrorMessage';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
import PageTitle from '../../components/stylingComponents/PageTitle';
import FilterBar from '../../components/Filter/FilterBar';

import { filterWrapperStyles, recipeListWrapper, recipePageContentStyles } from './styles';

const RecipesPage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const recipes: TRecipe[] = data?.getRecipes?.recipes || [];

  return (
    <WrapperContainer id="recipes-page">
      <PageTitle title="Find the best recipes" />
      <Box sx={recipePageContentStyles}>
        <Box sx={filterWrapperStyles}>
          <FilterBar />
        </Box>
        <Box sx={recipeListWrapper}>
          <RecipeList recipes={recipes} />
        </Box>
      </Box>
    </WrapperContainer>
  );
};

export default RecipesPage;
