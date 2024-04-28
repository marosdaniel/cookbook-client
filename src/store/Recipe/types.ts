import { TCategoryMetadata, TLabelMetadata, TLevelMetadata } from '../Metadata/types';

export type TRecipe = {
  _id: string;
  title: string;
  description: string;
  ingredients: TIngredient[];
  preparationSteps: TPreparationStep[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  imgSrc?: string;
  cookingTime: number;
  difficultyLevel: TLevelMetadata;
  category: TCategoryMetadata;
  labels: TLabelMetadata[] | [];
  servings: number;
  youtubeLink?: string;
};

export type TIngredient = {
  localId: string;
  name: string;
  quantity: number;
  unit: string;
};

export type TPreparationStep = {
  description: string;
  order: number;
};
