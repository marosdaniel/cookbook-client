import { useSelector } from 'react-redux';
import { RootState } from '..';

export const selectGlobalState = (state: RootState) => state.global;
export const useGlobalState = () => useSelector(selectGlobalState);
