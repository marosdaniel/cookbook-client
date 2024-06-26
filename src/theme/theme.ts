import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    // fontFamily: ['"Noto Sans JP"', 'sans-serif'].join(','),
    // fontFamily: ['"Circular"', 'sans-serif'].join(','), // TODO: add new font
  },
  palette: {
    primary: {
      // main: green[400],
      main: '#088F8F',
      // main: '#097969',
      // main: '#40B5AD',
    },
    text: {
      primary: '#334D',
      secondary: '#888888',
    },
  },
  // components: {
  //   MuiAlert: {
  //     styleOverrides: {
  //       standardSuccess: {
  //         backgroundColor: 'green',
  //         color: 'white',
  //       },
  //       standardError: {
  //         backgroundColor: 'red',
  //         color: 'white',
  //       },
  //       standardWarning: {
  //         backgroundColor: 'orange',
  //         color: 'white',
  //       },
  //       standardInfo: {
  //         backgroundColor: 'grey',
  //         color: 'black',
  //       },
  //     },
  //   },
  // },
});

export default theme;
