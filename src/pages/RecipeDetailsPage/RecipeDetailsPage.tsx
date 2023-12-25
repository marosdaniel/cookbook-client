import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Button, Grid, Link, Typography } from '@mui/material';

import { GET_RECIPE_BY_ID } from '../../service/graphql/recipe/getRecipes';
import LoadingBar from '../../components/LoadingBar';
import { useAuthState } from '../../store/Auth';
import { RecipeDetailsData } from './types';
import ErrorMessage from '../../components/ErrorMessage';
import { ENonProtectedRoutes } from '../../router/types';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
import PageTitle from '../../components/stylingComponents/PageTitle';
import PreparationStepList from './PreparationStepList';
import IngredientList from './IngredientList';

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthState();
  const { loading, error, data } = useQuery<RecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id } as { id: string },
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const recipe = data?.getRecipeById;

  const isEditAvailable = data?.getRecipeById.createdBy === user?.userName;

  const { title = '', createdAt, createdBy, description, preparationSteps, updatedAt, ingredients } = recipe || {};

  const linkToCreator = (
    <Link component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
      {createdBy}
    </Link>
  );

  const orderedPreparationSteps =
    preparationSteps!.length > 0
      ? preparationSteps?.filter(step => typeof step.order === 'number').sort((a, b) => a.order - b.order)
      : [];

  return (
    <WrapperContainer id="recipe-detail-page">
      <Grid display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title={title} />
        {isEditAvailable && (
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        )}
      </Grid>
      <Typography variant="subtitle2">from {linkToCreator}'s kitchen</Typography>
      <Typography variant="subtitle1">{description}</Typography>

      {ingredients && ingredients.length > 0 && <IngredientList ingredients={ingredients} title="Ingredients" />}

      {orderedPreparationSteps && orderedPreparationSteps.length > 0 && (
        <PreparationStepList preparationSteps={orderedPreparationSteps} title="Cooking instructions" />
      )}
    </WrapperContainer>
  );
};

export default RecipeDetailsPage;
