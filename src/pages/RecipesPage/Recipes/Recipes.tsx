import React from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { GET_RECIPES } from '../../../service/graphql/getRecipes';

const Recipes = () => {
  const [searchParams] = useSearchParams();
  const { loading, error, data } = useQuery(GET_RECIPES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const recipes = data?.getRecipes?.recipes || [];
  console.log(searchParams);

  return (
    <div>
      {recipes.map((recipe: any) => (
        <div key={recipe._id}>{recipe.title}</div>
      ))}
    </div>
  );
};

export default Recipes;
