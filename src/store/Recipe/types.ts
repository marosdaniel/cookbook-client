export type TRecipe = {
  _id: string;
  title: string;
  description: string;
  ingredients: TIngredient[];
  preparationSteps: TPreparationStep[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  author: string;
  imgSrc?: string;
  cookingTime: number;
  // difficultyLevel: TDifficultyLevel;
  difficultyLevel: string;
  category: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
};

export type TPreparationStep = {
  _id: string;
  description: string;
  order: number;
};
