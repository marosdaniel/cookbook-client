export const getListItemStyles = (disabled: boolean) => ({
  display: 'block',
  pointerEvents: disabled ? 'none' : 'auto',
});
