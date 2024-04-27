import { TRecipe } from '../../store/Recipe/types';
import { useMediaQuery, useTheme } from '@mui/material';

export const groupIntoChunks = (array: TRecipe[], chunkSize: number) => {
  const output: TRecipe[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    output.push(array.slice(i, i + chunkSize));
  }

  return output;
};

export const useChunkSize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  let chunkSize: number;
  switch (true) {
    case isTablet && isMobile:
      chunkSize = 1;
      break;
    case isTablet:
      chunkSize = 2;
      break;
    default:
      chunkSize = 3;
      break;
  }
  return chunkSize;
};
