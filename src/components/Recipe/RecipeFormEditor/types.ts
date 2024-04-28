import { TCategoryMetadata, TLabelMetadata, TLevelMetadata } from '../../../store/Metadata/types';
import { TIngredient, TPreparationStep } from '../../../store/Recipe/types';

export interface IProps {
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
}
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
  difficultyLevel: TLevelMetadata | undefined;
  category: TCategoryMetadata | undefined;
  labels: TLabelMetadata[] | [];
  ingredients: TIngredient[] | [];
  preparationSteps: TPreparationStep[] | [];
  servings: number;
  youtubeLink?: string;
}
