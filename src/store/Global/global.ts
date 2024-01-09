import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
  isDrawerOpen: boolean;
}

const initialState: GlobalState = {
  isDrawerOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openDrawer: state => {
      state.isDrawerOpen = true;
    },
    closeDrawer: state => {
      state.isDrawerOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer } = globalSlice.actions;
export default globalSlice.reducer;
