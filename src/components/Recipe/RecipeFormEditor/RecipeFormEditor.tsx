import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import { TIngredient } from '../../../store/Recipe/types';
import { difficultyLevels } from './const';
import { renderItem } from './utils';

const RecipeFormEditor = () => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([{ _id: '1', name: '', quantity: '1', unit: '' }]);

  const handleAddIngredient = () => {
    const newId = (ingredients.length + 1).toString();
    setIngredients(prevIngredients => [...prevIngredients, { _id: newId, name: '', quantity: '1', unit: '' }]);
  };

  const handleRemoveIngredient = (itemId: string) => {
    setIngredients(prevIngredients => prevIngredients.filter(item => item._id !== itemId));
  };

  const handleIngredientChange = (updatedItem: TIngredient) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(item => (item._id === updatedItem._id ? { ...updatedItem } : item)),
    );
  };

  const addIngredientButton = (
    <Button variant="contained" onClick={handleAddIngredient}>
      Add ingredient
    </Button>
  );

  useEffect(() => {
    console.log('useEffect ingredients: ', ingredients);
  }, [ingredients]);

  return (
    <Grid component="form" container spacing={12} maxWidth={1400}>
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

        <List sx={{ mt: 1 }}>
          <TransitionGroup>
            {ingredients.map(item => (
              <Collapse key={item._id}>{renderItem({ item, handleRemoveIngredient, handleIngredientChange })}</Collapse>
            ))}
          </TransitionGroup>
        </List>
        {addIngredientButton}
      </Grid>
    </Grid>
  );
};

export default RecipeFormEditor;
