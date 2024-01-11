import { TIngredient } from '../../../../store/Recipe/types';

export interface IProps {
  ingredients: TIngredient[] | [];
  setIngredients: React.Dispatch<React.SetStateAction<TIngredient[]>>;
  isEditMode?: boolean;
}
