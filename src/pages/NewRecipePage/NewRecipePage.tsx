import { Box, Grid, TextField, Typography } from '@mui/material';
import { boxStyles } from './styles';

const NewRecipePage = () => {
  const handleSubmit = () => {};
  return (
    <Grid>
      <Typography variant="h3">Creating new recipe</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={boxStyles}>
        <TextField margin="normal" required fullWidth id="title" label="Title" name="title" autoComplete="title" />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
        />
      </Box>
    </Grid>
  );
};

export default NewRecipePage;
