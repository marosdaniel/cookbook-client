import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import globalReducer from './Global';
import authReducer from './Auth';
import { authPersistConfig, globalPersistConfig } from './utils/persistConfigs';

const reducers = combineReducers({
  global: persistReducer(globalPersistConfig, globalReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AsyncThunkConfig = { state: RootState };
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
