import { useEffect, useState } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import { TIngredient } from '../../../../store/Recipe/types';
import { renderItem } from '../utils';
import { Button, Grid, Typography, List, Collapse } from '@mui/material';

const IngredientsEditor = () => {
  const newIngredient = { _id: '', name: '', quantity: 1, unit: '' };
  const [ingredients, setIngredients] = useState<TIngredient[]>([
    // { _id: '1', name: 'sajt', quantity: 1, unit: 'kilogram' },
    // { _id: '2', name: 'tojás', quantity: 2, unit: 'piece' },
    newIngredient,
  ]);

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

  useEffect(() => {
    console.log('ingredients: ', ingredients);
  }, [ingredients]);

  return (
    <Grid item xs={12} sm={12} md={10} lg={8} marginBottom={8}>
      <Typography variant="h6">Ingredients</Typography>
      <List>
        <TransitionGroup>
          {ingredients.map(item => (
            <Collapse key={item._id}>{renderItem({ item, handleRemoveIngredient, handleIngredientChange })}</Collapse>
          ))}
        </TransitionGroup>
      </List>
      <Button variant="outlined" onClick={handleAddIngredient} disabled={addIngredientButtonDisabled}>
        Add ingredient
      </Button>
    </Grid>
  );
};

export default IngredientsEditor;
