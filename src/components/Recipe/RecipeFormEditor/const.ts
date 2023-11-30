// TODO: make custom hook for API call to get difficulty levels

import { TDifficultyLevel, TUnit } from '../../../store/Recipe/types';

// useGetDifficultyLevels
export const difficultyLevels: TDifficultyLevel[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

// TODO: make custom hook for API call to get units
// useGetDifficultyLevels
export const units: TUnit[] = [
  {
    name: 'gram',
    label: 'g',
    key: 'g',
  },
  {
    name: 'kilogram',
    label: 'kg',
    key: 'kg',
  },
  {
    name: 'liter',
    label: 'l',
    key: 'l',
  },
  {
    name: 'milliliter',
    label: 'ml',
    key: 'ml',
  },
  {
    name: 'teaspoon',
    label: 'tsp',
    key: 'tsp',
  },
  {
    name: 'tablespoon',
    label: 'tbsp',
    key: 'tbsp',
  },
  {
    name: 'cup',
    label: 'cup',
    key: 'cup',
  },
  {
    name: 'pound',
    label: 'lb',
    key: 'lb',
  },
  {
    name: 'ounce',
    label: 'oz',
    key: 'oz',
  },
  {
    name: 'piece',
    label: 'piece',
    key: 'piece',
  },
];
