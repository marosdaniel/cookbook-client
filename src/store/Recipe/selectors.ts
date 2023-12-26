import { useSelector } from 'react-redux';
import { RootState } from '..';

export const selectRecipeState = (state: RootState) => state.recipe;
export const useRecipeState = () => useSelector(selectRecipeState);
