import { TIngredient } from '../../store/Recipe/types';

export interface RecipeDetailsData {
  getRecipeById: {
    id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    description: string;
    instructions: string;
    ingredients: TIngredient[];
    updatedAt: string;
  };
}
