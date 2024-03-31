// export const useFooterStyles = () => {
//   const isDrawerOpen = useGlobalState().isDrawerOpen;
//   const footerStyles = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: '60px',
//     // width: `${isDrawerOpen ? 'calc(100% - 240px)' : 'calc(100% - 64px)'}`,
//     width: {
//       xs: `${isDrawerOpen ? 'calc(100% - 240px)' : 'calc(100% - 64px)'}`,
//       sm: `${isDrawerOpen ? 'calc(100% - 240px)' : 'calc(100% - 64px)'}`,
//       md: `${isDrawerOpen ? 'calc(100% - 240px)' : 'calc(100% - 64px)'}`,
//     },
//     marginLeft: `${isDrawerOpen ? '240px' : '64px'}`,
//     backgroundColor: 'transparent',
//     boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
//     // position: 'absolute',
//     // bottom: 0,
//     transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
//   };
//   return { footerStyles };
// };

export const footerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
  //   width: 'calc(100% - 64px)',
  width: '100%',
  // marginLeft: '60px',
  backgroundColor: 'transparent',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  // position: 'absolute',
  // bottom: 0,
};

export const footerLeftGroupStyles = {
  margin: 0,
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  marginLeft: {
    xs: '8px',
    md: '24px',
  },
};

export const footerRightGroupStyles = {
  marginRight: {
    xs: '8px',
    md: '24px',
  },
  textAlign: 'right',
};

export const linkStyles = {
  textDecoration: 'none',
  cursor: 'pointer',
};
