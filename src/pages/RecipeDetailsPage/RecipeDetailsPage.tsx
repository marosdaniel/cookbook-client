import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Button, Container, Grid, Link, ListItemText, Typography } from '@mui/material';

import { GET_RECIPE_BY_ID } from '../../service/graphql/recipe/getRecipes';
import LoadingBar from '../../components/LoadingBar';
import { useAuthState } from '../../store/Auth';
import { RecipeDetailsData } from './types';
import ErrorMessage from '../../components/ErrorMessage';
import { ENonProtectedRoutes } from '../../router/types';

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

  const { title, createdAt, createdBy, description, preparationSteps, updatedAt, ingredients } = recipe || {};

  const linkToCreator = (
    <Link component={RouterLink} to={`${ENonProtectedRoutes.USERS}/${createdBy}`}>
      {createdBy}
    </Link>
  );

  return (
    <Container maxWidth={'xl'}>
      <Grid display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">{title}</Typography>
        {isEditAvailable && (
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        )}
      </Grid>
      <Typography variant="subtitle2">from {linkToCreator}'s kitchen</Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <Typography variant="h5">Cooking instructions</Typography>

      <ul>
        {preparationSteps?.map(step => (
          <ListItemText key={step.order}>
            <Typography variant="body1">{step.description}</Typography>
          </ListItemText>
        ))}
      </ul>
    </Container>
  );
};

export default RecipeDetailsPage;
