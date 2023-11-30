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

export type TDifficultyLevel = {
  value: string;
  label: string;
};

export type TUnit = {
  name: string;
  label: string;
  key: string;
};
