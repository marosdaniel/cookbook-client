import storageSession from 'redux-persist/lib/storage/session';

export const globalPersistConfig = {
  key: 'global',
  version: 1,
  storage: storageSession,
};

export const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage: storageSession,
};
