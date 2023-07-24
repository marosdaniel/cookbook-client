import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TGlobal } from './types';

const initialState: TGlobal = {
  isLoggedIn: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload; // replacable with session from useSession()
    },
  },
});

export const { setLoginState } = globalSlice.actions;

const globalReducer = globalSlice.reducer;

export default globalReducer;
