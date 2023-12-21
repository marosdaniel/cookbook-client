import { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import { TIngredient } from '../../../store/Recipe/types';
import { renderItem, useGetDifficultyLevels } from './utils';

const RecipeFormEditor = () => {
  const difficultyLevels = useGetDifficultyLevels();
  const [ingredients, setIngredients] = useState<TIngredient[]>([{ _id: '1', name: '', quantity: 1, unit: '' }]);

  const handleAddIngredient = () => {
    const newId = (ingredients.length + 1).toString();
    setIngredients(prevIngredients => [...prevIngredients, { _id: newId, name: '', quantity: 1, unit: '' }]);
  };

  const handleRemoveIngredient = (itemId: string) => {
    setIngredients(prevIngredients => prevIngredients.filter(item => item._id !== itemId));
  };

  const handleIngredientChange = (updatedItem: TIngredient) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(item => (item._id === updatedItem._id ? { ...updatedItem } : item)),
    );
  };

  const addIngredientButtonDisabled = ingredients.some(item => !item.name || !item.quantity || !item.unit);

  const addIngredientButton = (
    <Button variant="contained" onClick={handleAddIngredient} disabled={addIngredientButtonDisabled}>
      Add ingredient
    </Button>
  );

  useEffect(() => {
    console.log('useEffect ingredients: ', ingredients);
  }, [ingredients]);

  return (
    <Grid component="form" container spacing={8} width="100%">
      <Grid item xs={12} sm={10} md={4}>
        <Typography variant="h6">Please ensure all fields are filled out</Typography>
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
      <Grid item xs={12} sm={12} md={6} lg={8}>
        <Typography variant="h6">Ingredients</Typography>
        <List>
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