import { Grid } from '@mui/material';

import { TRecipe } from '../../../store/Recipe/types';
import RecipeCard from '../RecipeCard';
import { gridStyles } from './styles';
import { IProps } from './types';

const RecipeList = ({ recipes }: IProps) => {
  return (
    <Grid sx={gridStyles}>
      {recipes.map((recipe: TRecipe, index) => (
        <RecipeCard
          key={recipe._id || index}
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
  );
};

export default RecipeList;
