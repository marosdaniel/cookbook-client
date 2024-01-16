import theme from '../../theme';

export const footerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
  //   width: 'calc(100% - 64px)',
  width: '100%',
  marginLeft: '-24px',
  backgroundColor: theme.palette.grey[100],
  position: 'absolute',
  bottom: 0,
};

export const footerLeftGroupStyles = {
  margin: 0,
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  marginLeft: '24px',
};

export const footerRightGroupStyles = {
  marginRight: '24px',
};
