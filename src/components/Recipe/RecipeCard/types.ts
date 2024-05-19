import { TIngredient } from '../../../store/Recipe/types';

export interface IProps {
  title: string;
  description: string;
  ingredients: TIngredient[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  id: string;
  imgSrc?: string;
}
