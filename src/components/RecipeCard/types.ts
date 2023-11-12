import { TIngredient, TPreparationStep } from '../../store/Recipe/types';

export interface IProps {
  title: string;
  description: string;
  ingredients: TIngredient[];
  preparationSteps: TPreparationStep[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  author: string;
  id: string;
}
