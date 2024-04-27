import { Typography } from '@mui/material';

import WrapperContainer from '../../components/stylingComponents/WrapperContainer';
import { mockRecipes } from '../../mock/recipes';
import Carousel from '../../components/Carousel';

const HomePage = () => {
  return (
    <WrapperContainer id="home-page" maxWidth="xl">
      <Typography variant="h4" component="h2">
        popular recipes
      </Typography>
      <Carousel recipes={mockRecipes} />
    </WrapperContainer>
  );
};

export default HomePage;
