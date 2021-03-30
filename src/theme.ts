import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles' {
  interface Palette {
    gray: Palette['primary'];
    lightText: Palette['text'];
  }
  interface PaletteOptions {
    gray: PaletteOptions['primary'];
    lightText: PaletteOptions['text'];
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#1A75FF',
      main: '#0166FF',
      dark: '#1A75FF',
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
      primary: '#333',
      secondary: '#888',
      disabled: '#f0f0f0',
    },
    lightText: {
      primary: '#FFF',
    },
  },
});
