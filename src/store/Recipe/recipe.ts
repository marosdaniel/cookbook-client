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
      delete state.newRecipe;
    },
    editRecipe: (state, action: PayloadAction<TRecipe>) => {
      state.editRecipe = action.payload;
    },
    resetEditRecipe: state => {
      delete state.editRecipe;
    },
  },
});

export const { newRecipe, resetNewRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
