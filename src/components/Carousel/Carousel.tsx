import MaterialCarousel from 'react-material-ui-carousel';
import { useMediaQuery, useTheme, Box } from '@mui/material';
import { TRecipe } from '../../store/Recipe/types';
import RecipeCard from '../Recipe/RecipeCard';
import { groupIntoChunks, useChunkSize } from './utils';
import { IProps } from './types';

const Carousel = ({ recipes }: IProps) => {
  const chunkSize = useChunkSize();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('lg'));

  const getCardWidth = () => {
    if (isXs) return '100%';
    if (isSm) return '100%';
    if (isMd) return 'calc(100% / 3)';
    if (isLg) return 'calc(25%)';
    if (isXl) return 'calc(25%)';
    return 'calc(25%)';
  };

  const cardWidth = getCardWidth();

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
        <Box
          key={groupIndex}
          sx={{
            display: 'flex',
            // flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            mt: '20px',
            height: '100%',
          }}
        >
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
