import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Grid } from '@mui/material';

import { GET_USER_BY_USERNAME } from '../../service/graphql/user/getUser';
import LoadingBar from '../../components/LoadingBar';
import { TRecipe } from '../../store/Recipe/types';
import RecipeCard from '../../components/Recipe/RecipeCard';
import ErrorMessage from '../../components/ErrorMessage';

const UserPage = () => {
  const { userName } = useParams<{ userName: string }>();

  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { userName } as { userName: string },
  });

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  return (
    <Grid>
      {data.getUserByUserName.userName}
      <Grid component="ul">
        {data.getUserByUserName.recipes?.map((recipe: TRecipe) => (
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
    </Grid>
  );
};

export default UserPage;
