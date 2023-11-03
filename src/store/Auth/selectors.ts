import { useSelector } from 'react-redux';
import { RootState } from '..';

export const selectAuthState = (state: RootState) => state.auth;
export const useAuthState = () => useSelector(selectAuthState);
