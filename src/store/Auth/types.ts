import { TRecipe } from '../Recipe/types';

export interface IAuthState {
  user: TUser | null;
  isAuthenticated: boolean;
}

type TLocale = 'en-GB' | 'hu-HU';

export enum ERole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  BLOGGER = 'BLOGGER',
}

export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  locale: TLocale;
  userName: string;
  role: ERole;
  favoriteRecipes?: TRecipe[];
};
