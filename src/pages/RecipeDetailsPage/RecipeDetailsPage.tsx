import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Button, Chip, Grid, Link, Stack, Typography } from '@mui/material';

import { useAppDispatch } from '../../store/hooks';
import { setEditRecipe } from '../../store/Recipe/recipe';
import { TRecipe } from '../../store/Recipe/types';
import { GET_RECIPE_BY_ID } from '../../service/graphql/recipe/getRecipes';
import { useAuthState } from '../../store/Auth';
import { ENonProtectedRoutes } from '../../router/types';
import LoadingBar from '../../components/LoadingBar';
import ErrorMessage from '../../components/ErrorMessage';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
import PageTitle from '../../components/stylingComponents/PageTitle';
import RecipeFormEditor from '../../components/Recipe/RecipeFormEditor';
import PreparationStepList from './PreparationStepList';
import IngredientList from './IngredientList';
import { RecipeDetailsData } from './types';
import { commonTypographyStyles, labelWrapperStyles } from './styles';

const RecipeDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthState();
  const { loading, error, data } = useQuery<RecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id } as { id: string },
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const recipe: TRecipe | undefined = data?.getRecipeById;

  const {
    title,
    createdBy,
    description,
    preparationSteps,
    ingredients,
    updatedAt,
    category,
    cookingTime,
    createdAt,
    difficultyLevel,
    labels,
    servings,
  } = recipe || {};

  const isLabels = labels && labels?.length > 0;
  const isOwnRecipe = data?.getRecipeById.createdBy === user?.userName;
  const formattedCreatedAt = new Date(createdAt || Date.now())?.toLocaleDateString();
  const formattedUpdatedAt = new Date(updatedAt || Date.now())?.toLocaleDateString();

  const handleEdit = () => {
    if (recipe?.title) {
      dispatch(setEditRecipe(recipe));
      setIsEditMode(true);
    }
  };

  const linkToCreator = (
    <Link component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
      {createdBy}
    </Link>
  );

  const categoryLink = (
    <Link component={RouterLink} to={`${ENonProtectedRoutes.RECIPES}/?category=${category?.key}`}>
      {category?.label}
    </Link>
  );

  const orderedPreparationSteps =
    preparationSteps!.length > 0
      ? preparationSteps?.filter(step => typeof step.order === 'number').sort((a, b) => a.order - b.order)
      : [];

  if (isEditMode) {
    return <RecipeFormEditor isEditMode setIsEditMode={setIsEditMode} />;
  }

  return (
    <WrapperContainer id="recipe-detail-page">
      <Typography fontStyle={'italic'} variant="subtitle2">
        a {categoryLink} from {linkToCreator}'s kitchen
      </Typography>

      <Grid display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title={title ?? ''} />
        {isOwnRecipe && (
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Grid>
      {isLabels && (
        <Stack sx={labelWrapperStyles} direction="row" spacing={1}>
          {labels.map(label => (
            <Chip
              component={RouterLink}
              to={`${ENonProtectedRoutes.RECIPES}/?label=${label.key}`}
              key={label.key}
              label={label.label}
              color="primary"
              variant="outlined"
              sx={{ cursor: 'pointer', marginTop: '8px !important' }}
            />
          ))}
        </Stack>
      )}
      <Typography sx={commonTypographyStyles} variant="subtitle1">
        {description}
      </Typography>
      <Typography sx={commonTypographyStyles} variant="body1">
        cooking time: {cookingTime} mins
      </Typography>
      <Typography sx={commonTypographyStyles} variant="body1">
        difficulty level: {difficultyLevel?.label}
      </Typography>
      <Typography sx={commonTypographyStyles} variant="body1">
        portions: {servings}
      </Typography>
      <Typography sx={commonTypographyStyles} variant="body1">
        created at: {formattedCreatedAt}
      </Typography>
      {isOwnRecipe && (
        <Typography sx={commonTypographyStyles} variant="body1">
          updated at: {formattedUpdatedAt}
        </Typography>
      )}

      {ingredients && ingredients.length > 0 && <IngredientList ingredients={ingredients} title="Ingredients" />}

      {orderedPreparationSteps && orderedPreparationSteps.length > 0 && (
        <PreparationStepList preparationSteps={orderedPreparationSteps} title="Cooking instructions" />
      )}
    </WrapperContainer>
  );
};

export default RecipeDetailsPage;
