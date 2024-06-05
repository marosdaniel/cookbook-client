import MaterialCarousel from 'react-material-ui-carousel';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
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

  const getGridItemSize = () => {
    if (isXs) return 12;
    if (isSm) return 6;
    if (isMd) return 4;
    if (isLg) return 3;
    if (isXl) return 3;
    return 3;
  };

  const gridItemSize = getGridItemSize();

  console.log(gridItemSize);

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
              <Grid
                item
                key={index}
                xs={gridItemSize}
                sm={gridItemSize}
                md={gridItemSize}
                lg={gridItemSize}
                xl={gridItemSize}
              >
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
