import { useQuery } from '@apollo/client';

import {
  TCategoryMetadata,
  TLabelMetadata,
  TLevelMetadata,
  TMetadataType,
  TUnitMetadata,
} from '../../../store/Metadata/types';
import { GET_METADATA_BY_TYPE } from '../../../service/graphql/metadata/getMetadata';
import { TIngredient, TPreparationStep, TRecipe } from '../../../store/Recipe/types';
import { IFormikProps } from './types';

export const useGetDifficultyLevels = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TLevelMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.LEVEL },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const useGetUnits = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TUnitMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.UNIT },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const useGetLabels = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TLabelMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.LABEL },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const useGetCategories = () => {
  const { data, loading, error } = useQuery<{ getMetadataByType: TCategoryMetadata[] }>(GET_METADATA_BY_TYPE, {
    variables: { type: TMetadataType.CATEGORY },
  });

  if (loading) return [];
  if (error) return [];

  return data?.getMetadataByType || [];
};

export const cleanCategory = (category: TCategoryMetadata | undefined): TCategoryMetadata => {
  return {
    key: category?.key || '',
    label: category?.label || '',
    name: category?.name || '',
    type: TMetadataType.CATEGORY,
  };
};

export const cleanLabels = (labels: TLabelMetadata[]): TLabelMetadata[] => {
  return labels.map(label => ({
    key: label.key,
    label: label.label,
    name: label.name,
    type: TMetadataType.LABEL,
  }));
};

export const cleanIngredients = (ingredients: TIngredient[] | undefined): TIngredient[] => {
  return (
    ingredients?.map(ingredient => ({
      localId: ingredient.localId,
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })) || []
  );
};

export const cleanPreparationSteps = (preparationSteps: TPreparationStep[] | undefined): TPreparationStep[] => {
  return (
    preparationSteps?.map(step => ({
      description: step.description,
      order: step.order,
    })) || []
  );
};

export const cleanDifficultyLevel = (difficultyLevel: TLevelMetadata | undefined): TLevelMetadata => {
  return {
    key: difficultyLevel?.key || '',
    label: difficultyLevel?.label || '',
    name: difficultyLevel?.name || '',
    type: TMetadataType.LEVEL,
  };
};

export const getInitialValues = (
  isEditMode: boolean | undefined,
  newRecipeFromStore: TRecipe | undefined,
  editRecipeFromStore: TRecipe | undefined,
) => {
  const newIngredient = { localId: '1', name: '', quantity: 1, unit: '' };
  const newPreparationStep = { description: '', order: 1 };

  const initialIngredients = isEditMode
    ? editRecipeFromStore?.ingredients || []
    : newRecipeFromStore?.ingredients?.length
      ? [...newRecipeFromStore.ingredients]
      : [newIngredient];

  const initialPreparationSteps = isEditMode
    ? editRecipeFromStore?.preparationSteps || []
    : newRecipeFromStore?.preparationSteps?.length
      ? [...newRecipeFromStore.preparationSteps]
      : [newPreparationStep];

  return {
    title: isEditMode ? editRecipeFromStore?.title || '' : newRecipeFromStore?.title || '',
    description: isEditMode ? editRecipeFromStore?.description || '' : newRecipeFromStore?.description || '',
    imgSrc: isEditMode ? editRecipeFromStore?.imgSrc || '' : newRecipeFromStore?.imgSrc || '',
    cookingTime: isEditMode ? editRecipeFromStore?.cookingTime || 0 : newRecipeFromStore?.cookingTime || 0,
    difficultyLevel: isEditMode
      ? editRecipeFromStore?.difficultyLevel
      : newRecipeFromStore?.difficultyLevel || undefined,
    category: isEditMode ? editRecipeFromStore?.category : newRecipeFromStore?.category || undefined,
    labels: isEditMode ? editRecipeFromStore?.labels || [] : newRecipeFromStore?.labels || [],
    ingredients: initialIngredients,
    preparationSteps: initialPreparationSteps,
    servings: isEditMode ? editRecipeFromStore?.servings || 1 : newRecipeFromStore?.servings || 1,
  };
};

export const resetFormFields = (values: IFormikProps) => {
  values.title = '';
  values.description = '';
  values.imgSrc = '';
  values.servings = 1;
  values.cookingTime = 0;
  values.difficultyLevel = undefined;
  values.category = undefined;
  values.labels = [];
  values.ingredients = [];
  values.preparationSteps = [];
};

export const getInitialIngredients = (
  isEditMode: boolean,
  newRecipeFromStore: TRecipe | undefined,
  editRecipeFromStore: TRecipe | undefined,
): TIngredient[] => {
  const newIngredients = newRecipeFromStore?.ingredients || [];
  const editIngredients = editRecipeFromStore?.ingredients || [];
  const newIngredient = { localId: '1', name: '', quantity: 1, unit: '' };

  let ingredients: TIngredient[];

  if (isEditMode) {
    ingredients = editIngredients;
  } else {
    ingredients = newIngredients?.length ? [...newIngredients] : [newIngredient];
  }

  return ingredients;
};

export const getInitialPreparationSteps = (
  isEditMode: boolean,
  newRecipeFromStore: TRecipe | undefined,
  editRecipeFromStore: TRecipe | undefined,
): TPreparationStep[] => {
  const newPreparationSteps = newRecipeFromStore?.preparationSteps || [];
  const editPreparationSteps = editRecipeFromStore?.preparationSteps || [];
  const newPreparationStep: TPreparationStep = { description: '', order: 1 };

  let preparationSteps: TPreparationStep[];

  if (isEditMode) {
    preparationSteps = editPreparationSteps;
  } else {
    preparationSteps = newPreparationSteps?.length ? [...newPreparationSteps] : [newPreparationStep];
  }

  return preparationSteps;
};
