export interface IAuthState {
  user: TUser | null;
  isAuthenticated: boolean;
}

type TLocale = 'en-GB' | 'hu-HU';

export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  locale: TLocale;
  userName: string;
  password: string;
};
