import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRecipe } from './types';

interface RecipeState {
  newRecipe: TRecipe | undefined;
}

const initialState: RecipeState = {
  newRecipe: undefined,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    newRecipe: (state, action: PayloadAction<any | undefined>) => {
      state.newRecipe = action.payload;
    },
    resetNewRecipe: state => {
      state.newRecipe = undefined;
    },
  },
});

export const { newRecipe, resetNewRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
