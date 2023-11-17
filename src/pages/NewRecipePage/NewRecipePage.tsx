import { Grid, Typography } from '@mui/material';
import RecipeFormEditor from '../../components/RecipeFormEditor';

const NewRecipePage = () => {
  // const handleSubmit = () => {};
  return (
    <Grid>
      <Typography variant="h3" marginBottom={4}>
        Creating new recipe
      </Typography>
      <RecipeFormEditor />
    </Grid>
  );
};

export default NewRecipePage;
