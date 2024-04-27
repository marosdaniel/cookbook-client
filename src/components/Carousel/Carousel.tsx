import MaterialCarousel from 'react-material-ui-carousel';
import { Grid } from '@mui/material';
import { TRecipe } from '../../store/Recipe/types';
import RecipeCard from '../Recipe/RecipeCard';
import { groupIntoChunks, useChunkSize } from './utils';
import { IProps } from './types';

const Carousel = ({ recipes }: IProps) => {
  const chunkSize = useChunkSize();

  return (
    <MaterialCarousel
      animation="slide"
      autoPlay={false}
      height="380px"
      cycleNavigation={false}
      duration={200}
      navButtonsAlwaysVisible
      fullHeightHover
      swipe
      indicators
    >
      {groupIntoChunks(recipes, chunkSize).map((group, groupIndex) => (
        <Grid
          container
          key={groupIndex}
          sx={{ gap: '20px', justifyContent: 'center', alignItems: 'center', p: '20px', height: '100%' }}
        >
          {group.map((recipe: TRecipe, index: number) => {
            const { _id: id, createdBy, title, description, ingredients, createdAt, updatedAt } = recipe;
            return (
              <Grid item key={index} xs sm md lg xl>
                <RecipeCard
                  key={`card-${index}`}
                  id={id}
                  createdBy={createdBy}
                  title={title}
                  description={description}
                  ingredients={ingredients}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                />
              </Grid>
            );
          })}
        </Grid>
      ))}
    </MaterialCarousel>
  );
};

export default Carousel;
