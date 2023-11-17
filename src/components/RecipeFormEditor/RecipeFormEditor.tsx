import { Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { difficultyLevels } from './const';

const RecipeFormEditor = () => {
  return (
    <Grid component="form" container spacing={12}>
      <Grid item xs={12} md={6} lg={4}>
        <Typography variant="h6">Please fill all fields</Typography>
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
              max: 1000,
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
            label="Difficult level"
            helperText="Please select level of difficulty"
            variant="standard"
            defaultValue="medium"
          >
            {difficultyLevels.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Typography variant="h6">Ingredients</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="placeholder"
          label="placeholder"
          name="placeholder"
          autoComplete="placeholder"
          variant="standard"
        />
      </Grid>
    </Grid>
  );
};

export default RecipeFormEditor;
