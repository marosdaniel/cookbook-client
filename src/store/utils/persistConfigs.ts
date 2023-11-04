import localStorage from 'redux-persist/es/storage';

export const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage: localStorage,
};
