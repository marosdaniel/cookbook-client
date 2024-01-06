import { TIngredient, TPreparationStep } from '../../../store/Recipe/types';

export interface RenderItemOptions {
  item: TIngredient;
  handleRemoveIngredient: (item: string) => void;
  handleIngredientChange: (item: TIngredient) => void;
}

export interface IFormikProps {
  title: string;
  description: string;
  imgSrc?: string;
  cookingTime: number;
  difficultyLevel: string;
  ingredients: TIngredient[] | [];
  preparationSteps: TPreparationStep[] | [];
}
