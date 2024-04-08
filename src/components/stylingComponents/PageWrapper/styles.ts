import { useGlobalState } from '../../../store/Global';

export const useWrapperStyles = () => {
  const isDrawerOpen = useGlobalState().isDrawerOpen;

  const wrapperStyles = {
    marginLeft: {
      xs: '56px',
      sm: '64px',
      md: isDrawerOpen ? '240px' : '64px',
    },
    paddingBottom: {
      xs: '80px',
      sm: '60px',
    },
    transition: 'margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    minHeight: {
      xs: 'calc(100vh - 80px)',
      sm: 'calc(100vh - 64px)',
    },
    position: 'relative',
  };

  return wrapperStyles;
};
