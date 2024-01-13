export const gridContainerStyles = {
  width: '100%',
  paddingLeft: {
    md: '60px',
  },
  display: 'flex',
  flexDirection: 'rows',
};

export const listItemStyles = {
  paddingLeft: {
    xs: 0,
    md: 2,
  },
};

export const buttonWrapperStyles = {
  display: 'flex',
  justifyContent: {
    xs: 'center',
    md: 'flex-end',
  },
  flexDirection: {
    xs: 'column',
    md: 'row',
  },
};

export const buttonStyles = {
  width: {
    xs: '100%',
    md: 'auto',
  },
};

export const resetButtonStyles = {
  ...buttonStyles,
  marginRight: {
    xs: 0,
    md: '8px',
  },
  marginBottom: {
    xs: '8px',
    md: 0,
  },
};
