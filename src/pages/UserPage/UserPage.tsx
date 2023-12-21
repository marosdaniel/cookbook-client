import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_USER_BY_USERNAME } from '../../service/graphql/user/getUser';
import LoadingBar from '../../components/LoadingBar';
import { TRecipe } from '../../store/Recipe/types';
import ErrorMessage from '../../components/ErrorMessage';
import RecipeList from '../../components/Recipe/RecipeList';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
import PageTitle from '../../components/stylingComponents/PageTitle';

const UserPage = () => {
  const { userName } = useParams<{ userName: string }>();

  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { userName } as { userName: string },
  });

  if (loading) return <LoadingBar />;
  if (error) return <ErrorMessage />;

  const recipes: TRecipe[] = data?.getUserByUserName.recipes || [];
  const title = recipes.length ? `best recipes from ${userName}'s kitchen` : `${userName} has no recipes yet`;

  return (
    <WrapperContainer id="user-page">
      <PageTitle title={title} />
      {recipes.length ? <RecipeList recipes={recipes} /> : null}
    </WrapperContainer>
  );
};

export default UserPage;
