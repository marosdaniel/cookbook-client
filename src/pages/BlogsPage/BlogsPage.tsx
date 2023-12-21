import { Typography } from '@mui/material';
import UnderConstruction from '../../components/UnderConstruction';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';

const BlogsPage = () => {
  return (
    <WrapperContainer id="blogs-page">
      <Typography variant="h3">Fascinating facts, scientific articles, writings, and more.</Typography>
      <UnderConstruction />
    </WrapperContainer>
  );
};

export default BlogsPage;
