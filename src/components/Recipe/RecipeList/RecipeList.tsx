import { Grid } from '@mui/material';

import { TRecipe } from '../../../store/Recipe/types';
import RecipeCard from '../RecipeCard';
import { gridStyles } from './styles';
import { IProps } from './types';

const RecipeList = ({ recipes }: IProps) => {
  return (
    <Grid component="ul" sx={gridStyles}>
      {recipes.map((recipe: TRecipe, index) => {
        const {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          _id,
          title,
          description,
          author,
          createdBy,
          createdAt,
          ingredients,
          updatedAt,
          imgSrc,
        } = recipe;
        return (
          <RecipeCard
            key={_id || index}
            title={title}
            description={description}
            author={author}
            createdAt={createdAt}
            createdBy={createdBy}
            ingredients={ingredients}
            updatedAt={updatedAt}
            id={_id}
            imgSrc={imgSrc}
          />
        );
      })}
    </Grid>
  );
};

export default RecipeList;
