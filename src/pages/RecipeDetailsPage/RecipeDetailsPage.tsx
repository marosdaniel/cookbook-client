import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_RECIPE_BY_ID } from '../../service/graphql/recipe/getRecipes';
import LoadingBar from '../../components/LoadingBar';
import { RecipeDetailsData } from './types';
import { Container, Typography } from '@mui/material';

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<RecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id } as { id: string },
  });

  if (loading) return <LoadingBar />;
  if (error) return <div>Error :(</div>;

  console.log(data);

  const recipe = data?.getRecipeById;

  const { title, createdAt, createdBy, description, instructions, updatedAt, ingredients } = recipe || {};

  return (
    <Container>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h6">{description}</Typography>
      <Typography variant="body1">{instructions}</Typography>
    </Container>
  );
};

export default RecipeDetailsPage;
