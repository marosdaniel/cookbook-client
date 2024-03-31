import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { useGlobalState } from '../../../store/Global';

const PageWrapper = ({ children }: PropsWithChildren) => {
  const isDrawerOpen = useGlobalState().isDrawerOpen;
  const wrapperStyles = {
    marginLeft: {
      xs: '56px',
      sm: '64px',
      md: isDrawerOpen ? '240px' : '64px',
    },
    transition: 'margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    // padding: {
    //   xs: '8px',
    //   sm: '12px',
    //   md: '16px',
    //   lg: '24px',
    // },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // position: 'relative',
    minHeight: {
      xs: 'calc(100vh - 56px)',
      // sm: 'calc(100vh - 56px)',
      md: 'calc(100vh - 64px)',
    },

    // paddingBottom: '60px !important',
  };
  return <Box sx={wrapperStyles}>{children}</Box>;
};

export default PageWrapper;
