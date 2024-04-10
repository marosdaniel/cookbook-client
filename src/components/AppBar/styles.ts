import { useGlobalState } from '../../store/Global';

export const getListItemStyles = (disabled: boolean) => ({
  display: 'block',
  pointerEvents: disabled ? 'none' : 'auto',
});

export const useAppBarTitleStyles = () => {
  const { isDrawerOpen } = useGlobalState();

  const positionValue = isDrawerOpen ? '150%' : '0';
  const appBarTitleStyles = {
    fontSize: {
      xs: '16px',
      sm: '18px',
      md: '22px',
    },
    position: 'relative',
    top: '1px',
    left: {
      xs: positionValue,
      sm: '0',
    },
    transition: 'left 0.2s ease',
  };

  return appBarTitleStyles;
};
