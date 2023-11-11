import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_USER_BY_USERNAME } from '../../service/graphql/user/getUser';
import LoadingBar from '../../components/LoadingBar';
import { TRecipe } from '../../store/Recipe/types';

const UserPage = () => {
  const { userName } = useParams<{ userName: string }>();

  console.log(userName);
  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { userName } as { userName: string },
  });

  if (loading) return <LoadingBar />;
  if (error) return <div>Error :(</div>;

  return (
    <div>
      {data.getUserByUserName.userName}
      <ul>{data.getUserByUserName.recipes?.map((recipe: TRecipe) => <li>{recipe.title}</li>)}</ul>
    </div>
  );
};

export default UserPage;
