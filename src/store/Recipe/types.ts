export type TRecipe = {
  _id: string;
  title: string;
  description: string;
  ingredients: TIngredient[];
  instructions: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  author: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  quantity: string;
};
