import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#1976d2',
      light: '#64b5f6',
      main: '#2196f3',
    },
    secondary: {
      light: 'rgba(29, 34, 39, 0.06)',
      main: 'rgba(29, 34, 39, 0.2)',
      dark: 'rgba(29, 34, 39, 0.4)',
      contrastText: '#333',
    },
  },
});
