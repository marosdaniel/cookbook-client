import { useEffect } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Button, Grid, Typography, List, Collapse, ListItem, IconButton, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TIngredient } from '../../../../store/Recipe/types';
import { useRecipeState } from '../../../../store/Recipe';
import { useAppDispatch } from '../../../../store/hooks';
import { newRecipe, setEditRecipe } from '../../../../store/Recipe/recipe';
import { useGetUnits } from '../utils';
import { listItemStyles } from '../styles';
import { IProps } from './types';

const IngredientsEditor = ({ ingredients, setIngredients, isEditMode }: IProps) => {
  const dispatch = useAppDispatch();
  const { newRecipe: newRecipeFromStore, editRecipe: editRecipeFromStore } = useRecipeState();
  const units = useGetUnits();
  const addIngredientButtonDisabled = ingredients.some(item => !item.name || !item.quantity || !item.unit);

  const handleAddIngredient = () => {
    const newId = (ingredients.length + 1).toString();
    setIngredients(prevIngredients => [...prevIngredients, { localId: newId, name: '', quantity: 1, unit: '' }]);
  };

  const handleRemoveIngredient = (itemId: string) => {
    setIngredients(prevIngredients => prevIngredients.filter(item => item.localId !== itemId));
  };

  const handleIngredientChange = (updatedItem: TIngredient) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(item => (item.localId === updatedItem.localId ? { ...updatedItem } : item)),
    );
  };

  useEffect(() => {
    if (isEditMode) {
      const difficultyLevel = editRecipeFromStore?.difficultyLevel;
      const category = editRecipeFromStore?.category;
      if (difficultyLevel !== undefined && category !== undefined && editRecipeFromStore?._id !== undefined) {
        dispatch(
          setEditRecipe({
            ...editRecipeFromStore,
            ingredients,
          }),
        );
      }
    } else {
      dispatch(newRecipe({ ...newRecipeFromStore, ingredients }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  return (
    <Grid item xs={12} sm={12} md={10} lg={8} marginBottom={8}>
      <Typography variant="h6">Ingredients</Typography>
      <List>
        <TransitionGroup>
          {ingredients.map(item => (
            <Collapse key={item.localId}>
              <ListItem
                sx={listItemStyles}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    title="Delete"
                    onClick={() => handleRemoveIngredient(item.localId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Grid item xs={12} md={6} lg={9.5}>
                  <TextField
                    value={item.name}
                    label="Name"
                    variant="standard"
                    onChange={event => handleIngredientChange({ ...item, name: event.target.value })}
                    sx={{ width: '90%' }}
                    required
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={1} marginRight={2}>
                  <TextField
                    value={item.quantity}
                    label="Quantity"
                    variant="standard"
                    onChange={event => handleIngredientChange({ ...item, quantity: +event.target.value })}
                    inputProps={{ min: 0, style: { textAlign: 'right' } }}
                    sx={{ width: '90%' }}
                    required
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={1.5} marginRight={0}>
                  <TextField
                    select
                    id="unit-dropdown"
                    label="Unit"
                    value={item.unit}
                    onChange={event => handleIngredientChange({ ...item, unit: event.target.value })}
                    variant="standard"
                    required
                    sx={{
                      width: '90%',
                    }}
                  >
                    {units.map(unit => (
                      <MenuItem key={unit.key} value={unit.name}>
                        {unit.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <Button
        variant="outlined"
        onClick={handleAddIngredient}
        disabled={addIngredientButtonDisabled}
        sx={{ marginTop: '12px' }}
      >
        +
      </Button>
    </Grid>
  );
};

export default IngredientsEditor;
