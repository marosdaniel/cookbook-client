import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { useWrapperStyles } from './styles';

const PageWrapper = ({ children }: PropsWithChildren) => {
  const wrapperStyles = useWrapperStyles();

  return <Box sx={wrapperStyles}>{children}</Box>;
};

export default PageWrapper;
