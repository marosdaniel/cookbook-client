import React from 'react';
import { CircularProgress } from '@mui/material';
import { TLoadingBarProps } from './types';

const LoadingBar = ({ sizeInRem }: TLoadingBarProps) => {
  return <CircularProgress size={sizeInRem} />;
};
export default LoadingBar;
