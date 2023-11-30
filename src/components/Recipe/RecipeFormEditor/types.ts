import { TIngredient } from '../../../store/Recipe/types';

export interface RenderItemOptions {
  item: TIngredient;
  handleRemoveIngredient: (item: string) => void;
  handleIngredientChange: (item: TIngredient) => void;
}
