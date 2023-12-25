import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';

import PreparationStepsEditor from './PreparationStepsEditor';
import IngredientsEditor from './IngredientsEditor';
import { useGetDifficultyLevels } from './utils';
import { gridContainerStyles } from './styles';

const RecipeFormEditor = () => {
  const difficultyLevels = useGetDifficultyLevels();
  // useEffect(() => {
  //   console.log('useEffect ingredients: ', ingredients);
  // }, [ingredients]);

  return (
    <Grid component="form" container sx={gridContainerStyles}>
      <Grid item xs={12} sm={12} md={6} lg={8} marginBottom={8}>
        <Typography variant="h5" marginBottom={2}>
          Please ensure all fields are filled out
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          variant="standard"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          variant="standard"
        />
        <TextField
          margin="normal"
          fullWidth
          id="image-url"
          label="Image URL"
          name="image-url"
          autoComplete="image-url"
          variant="standard"
        />
        <TextField
          margin="normal"
          required
          type="number"
          id="cooking-time"
          label="Cooking time"
          name="cooking-time"
          autoComplete="cooking-time"
          InputProps={{
            endAdornment: <InputAdornment position="start">min</InputAdornment>,
            inputProps: {
              type: 'number',
              min: 0,
              max: 999,
              step: 1,
              style: { textAlign: 'right', marginRight: '8px' },
            },
          }}
          variant="standard"
          helperText="Please enter cooking time in minutes"
        />
        <Grid item xs={12} sx={{ mt: '16px', mb: '8px' }}>
          <TextField
            id="difficulty-level"
            select
            label="Difficulty level"
            helperText="Please select level of difficulty"
            variant="standard"
            defaultValue="medium"
            disabled={!difficultyLevels.length}
          >
            {difficultyLevels.map(option => (
              <MenuItem key={option.key} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <IngredientsEditor />
      <PreparationStepsEditor />
      <Grid item xs={12} sm={12} md={6} lg={8} textAlign={'right'}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecipeFormEditor;
