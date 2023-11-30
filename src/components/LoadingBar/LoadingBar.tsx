import { Box, CircularProgress } from '@mui/material';

import { TLoadingBarProps } from './types';

const LoadingBar = ({ sizeInRem = '3rem' }: TLoadingBarProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" maxHeight="100vh">
      <CircularProgress size={sizeInRem} />
    </Box>
  );
};
export default LoadingBar;
