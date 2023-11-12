import { useQuery } from '@apollo/client';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { GET_RECIPE_BY_ID } from '../../service/graphql/recipe/getRecipes';
import LoadingBar from '../../components/LoadingBar';
import { RecipeDetailsData } from './types';
import { Container, Link, Typography } from '@mui/material';

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<RecipeDetailsData>(GET_RECIPE_BY_ID, {
    variables: { id } as { id: string },
  });
  console.log(data);

  if (loading) return <LoadingBar />;
  if (error) return <div>Error :(</div>;

  const recipe = data?.getRecipeById;

  const { title, createdAt, createdBy, description, preparationSteps, updatedAt, ingredients } = recipe || {};

  const linkToCreator = (
    <Link component={RouterLink} to={`/users/${createdBy}`}>
      {createdBy}
    </Link>
  );

  return (
    <Container>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle1">from {linkToCreator}'s kitchen</Typography>
      <Typography variant="h6">{description}</Typography>
      <ul>{preparationSteps?.map(step => <li key={step._id}>{step.description}</li>)}</ul>
    </Container>
  );
};

export default RecipeDetailsPage;
