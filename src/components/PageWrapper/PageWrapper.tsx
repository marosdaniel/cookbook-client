import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { useGlobalState } from '../../store/Global';

const PageWrapper = ({ children }: PropsWithChildren) => {
  const isDrawerOpen = useGlobalState().isDrawerOpen;
  const wrapperStyles = {
    marginLeft: {
      xs: '56px',
      md: isDrawerOpen ? '240px' : '64px',
    },
    transition: 'margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  };
  return <Box sx={wrapperStyles}>{children}</Box>;
};

export default PageWrapper;
