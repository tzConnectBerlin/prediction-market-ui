import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'rgba(26, 117, 255, 1)',
      main: 'rgba(1, 102, 255, 1)',
      dark: 'rgba(26, 117, 255, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(57, 255, 194, 0.5)',
      main: 'rgba(57, 255, 194,1)',
      dark: 'rgba(57, 255, 194,1)',
      contrastText: '#fff',
    },
    gray: {
      light: 'rgba(29, 34, 39, 0.06)',
      main: 'rgba(29, 34, 39, 0.2)',
      dark: 'rgba(29, 34, 39, 0.4)',
      contrastText: '#333',
    },
    text: {
      primary: 'rgba(29, 34, 39, 0.87)',
      secondary: 'rgba(29, 34, 39, 0.54)',
      disabled: 'rgba(29, 34, 39, 0.38)',
    },
    lightText: {
      primary: '#FFF',
    },
  },
});
