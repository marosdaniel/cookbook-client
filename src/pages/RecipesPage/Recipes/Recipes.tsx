import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Recipes = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  console.log(searchParams);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <div>{category}</div>
    </div>
  );
};

export default Recipes;
