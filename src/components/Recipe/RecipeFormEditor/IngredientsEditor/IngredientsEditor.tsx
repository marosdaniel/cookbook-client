import { useEffect } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Button, Grid, Typography, List, Collapse } from '@mui/material';

import { TIngredient } from '../../../../store/Recipe/types';
import { useRecipeState } from '../../../../store/Recipe';
import { useAppDispatch } from '../../../../store/hooks';
import { newRecipe } from '../../../../store/Recipe/recipe';
import { renderItem } from '../utils';
import { IProps } from './types';

const IngredientsEditor = ({ ingredients, setIngredients }: IProps) => {
  const dispatch = useAppDispatch();
  const { newRecipe: storedNewRecipe, editRecipe: storedEditRecipe } = useRecipeState();

  // const newIngredients = storedNewRecipe?.ingredients || [];
  // const editIngredients = storedEditRecipe?.ingredients || [];

  // const newIngredient = { _id: '', name: '', quantity: 1, unit: '' };
  // const initialIngredient = newIngredients?.length ? [...newIngredients] : [newIngredient];

  // const [ingredients, setIngredients] = useState<TIngredient[]>(initialIngredient);

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
    dispatch(newRecipe({ ...storedNewRecipe, ingredients }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
