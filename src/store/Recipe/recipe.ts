import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRecipe } from './types';

interface RecipeState {
  newRecipe: TRecipe | undefined;
  editRecipe: TRecipe | undefined;
}

const initialState: RecipeState = {
  newRecipe: undefined,
  editRecipe: undefined,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    newRecipe: (state, action: PayloadAction<any>) => {
      state.newRecipe = action.payload;
    },
    resetNewRecipe: state => {
      state.newRecipe = undefined;
    },
    setEditRecipe: (state, action: PayloadAction<TRecipe>) => {
      state.editRecipe = action.payload;
    },
    resetEditRecipe: state => {
      state.editRecipe = undefined;
    },
  },
});

export const { newRecipe, resetNewRecipe, setEditRecipe, resetEditRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
