import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../../../service/graphql/recipe/getRecipes';
import LoadingBar from '../../../components/LoadingBar';

const Recipes = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <LoadingBar />;
  if (error) return <div>Error :(</div>;

  const recipes = data?.getRecipes?.recipes || [];

  return (
    <div>
      {recipes.map((recipe: any) => (
        <div key={recipe._id}>{recipe.title}</div>
      ))}
    </div>
  );
};

export default Recipes;
