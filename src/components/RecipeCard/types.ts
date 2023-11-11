import { TIngredient } from '../../store/Recipe/types';

export interface IProps {
  title: string;
  description: string;
  ingredients: TIngredient[];
  instructions: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  author: string;
  id: string;
}
