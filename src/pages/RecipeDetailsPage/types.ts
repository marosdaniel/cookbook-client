import { TIngredient, TPreparationStep } from '../../store/Recipe/types';

export interface RecipeDetailsData {
  getRecipeById: {
    id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    description: string;
    preparationSteps: TPreparationStep[];
    ingredients: TIngredient[];
    updatedAt: string;
  };
}
