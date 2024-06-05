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

export const useResponsiveCardWidth = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('lg'));

  const getCardWidth = () => {
    if (isXs) return '100%';
    if (isSm) return '100%';
    if (isMd) return 'calc(100% / 3)';
    if (isLg) return 'calc(25%)';
    if (isXl) return 'calc(25%)';
    return 'calc(25%)';
  };

  const cardWidth = getCardWidth();

  return cardWidth;
};
