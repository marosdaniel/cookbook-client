import React from 'react';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { ENonProtectedRoutes } from '../../router/types';
import { gql, useQuery } from '@apollo/client';

const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      recipes {
        _id
        title
      }
      totalRecipes
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const recipes = data?.getRecipes?.recipes || [];
  return (
    <div>
      <Link variant="button" component={RouterLink} to={ENonProtectedRoutes.SIGNIN}>
        sign in
      </Link>
      {recipes.map((recipe: any) => (
        <div key={recipe._id}>{recipe.title}</div>
      ))}
    </div>
  );
};

export default HomePage;
