import MaterialCarousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import { TRecipe } from '../../store/Recipe/types';
import RecipeCard from '../Recipe/RecipeCard';
import { groupIntoChunks, useChunkSize, useResponsiveCardWidth } from './utils';
import { IProps } from './types';
import { carouselContainerStyles } from './styles';

const Carousel = ({ recipes }: IProps) => {
  const chunkSize = useChunkSize();
  const cardWidth = useResponsiveCardWidth();

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
        <Box key={groupIndex} sx={carouselContainerStyles}>
          {group.map((recipe: TRecipe, index: number) => {
            const { _id: id, createdBy, title, description, ingredients, createdAt, updatedAt } = recipe;
            return (
              <Box key={index} sx={{ width: cardWidth, boxSizing: 'border-box' }}>
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
              </Box>
            );
          })}
        </Box>
      ))}
    </MaterialCarousel>
  );
};

export default Carousel;
