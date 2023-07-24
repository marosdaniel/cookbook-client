import storageSession from 'redux-persist/lib/storage/session';

export const globalPersistConfig = {
  key: 'global',
  version: 1,
  storage: storageSession,
};
