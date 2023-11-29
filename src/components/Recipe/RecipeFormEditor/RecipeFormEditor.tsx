import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

import { difficultyLevels } from './const';
import { RenderItemOptions } from './types';

const ingredientItems = ['🍏 Apple', '🍌 Banana', '🍍 Pineapple', '🥥 Coconut', '🍉 Watermelon'];

function renderItem({ item, handleRemoveFruit }: RenderItemOptions) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" title="Delete" onClick={() => handleRemoveFruit(item)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}

const RecipeFormEditor = () => {
  const [fruitsInBasket, setFruitsInBasket] = useState(ingredientItems.slice(0, 3));

  const handleAddIngredient = () => {
    const nextHiddenItem = ingredientItems.find(i => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket(prev => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveIngredient = (item: string) => {
    setFruitsInBasket(prev => [...prev.filter(i => i !== item)]);
  };

  const addIngredientButton = (
    <Button sx={{ marginRight: 'auto' }} variant="contained" onClick={handleAddIngredient}>
      Add ingredient
    </Button>
  );

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

        <List sx={{ mt: 1 }}>
          <TransitionGroup>
            {fruitsInBasket.map(item => (
              <Collapse key={item}>{renderItem({ item, handleRemoveFruit: handleRemoveIngredient })}</Collapse>
            ))}
          </TransitionGroup>
        </List>
        {addIngredientButton}
      </Grid>
    </Grid>
  );
};

export default RecipeFormEditor;
