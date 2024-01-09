import localStorage from 'redux-persist/es/storage';

export const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage: localStorage,
};

export const recipePersistConfig = {
  key: 'recipe',
  version: 2,
  storage: localStorage,
};

export const globalPersistConfig = {
  key: 'global',
  version: 1,
  storage: localStorage,
};
