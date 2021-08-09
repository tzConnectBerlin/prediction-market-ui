import { createTheme, PaletteOptions } from '@material-ui/core/styles';

const lightThemePalette: PaletteOptions = {
  primary: {
    dark: 'rgba(26, 117, 255, 1)',
    main: 'rgba(1, 102, 255, 1)',
    light: 'rgba(1, 102, 255, 0.12)',
    contrastText: 'rgba(255, 255, 255, 1)',
  },
  secondary: {
    dark: 'rgba(1, 102, 255, 0.10)',
    main: 'rgba(1, 102, 255, 0.12)',
    contrastText: 'rgba(1, 102, 255, 1)',
  },
  success: {
    dark: 'rgba(212, 241, 204, 1)',
    main: 'rgba(42, 184, 0, 1)',
    light: 'rgba(212, 241, 204, 0.12)',
  },
  warning: {
    dark: 'rgba(255, 229, 212, 1)',
    main: 'rgba(253, 125, 42, 1)',
  },
  error: {
    dark: 'rgba(255, 215, 215, 1)',
    main: 'rgba(255, 57, 57, 1)',
    light: 'rgba(255, 215, 215, 0.12)',
  },
  tertiary: {
    dark: 'rgba(105, 255, 209, 1)',
    main: 'rgba(57, 255, 194, 1)',
    light: 'rgba(57, 255, 194, 0.12)',
    contrastText: 'rgba(29, 34, 39, 0.87)',
  },
  grey: {
    '900': 'rgba(29, 34, 39, 1)',
    '800': 'rgba(29, 34, 39, 0.87)',
    '700': 'rgba(29, 34, 39, 0.38)',
    '600': 'rgba(29, 34, 39, 0.09)',
    '500': 'rgba(29, 34, 39, 0.07)',
    '400': 'rgba(29, 34, 39, 0.06)',
    '300': 'rgba(29, 34, 39, 0.04)',
    '200': 'rgba(29, 34, 39, 0.03)',
    '100': 'rgba(29, 34, 39, 0.02)',
  },
  text: {
    primary: 'rgba(29, 34, 39, 0.87)',
    secondary: 'rgba(29, 34, 39, 0.54)',
    disabled: 'rgba(29, 34, 39, 0.38)',
  },
  buttonText: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.54)',
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  background: {
    default: 'rgba(253, 253, 255, 1)',
    paper: 'rgba(255, 255, 255, 1)',
  },
  tonalOffset: 0.05,
  mode: 'light',
};

export const lightTheme = createTheme({
  palette: lightThemePalette,
  typography: {
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto Mono',
    },
    h4: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto Mono',
    },
    h5: {
      fontWeight: 700,
      fontSize: '0.625rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto Mono',
    },
    h6: {
      fontWeight: 700,
      fontSize: '0.625rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto Mono',
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: '0.75rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto Mono',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.3',
      fontFamily: 'Roboto',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    ...lightThemePalette,
    primary: {
      dark: 'rgba(214, 231, 255, 1)',
      main: 'rgba(204, 224, 255, 1)',
      light: 'rgba(204, 224, 255, .12)',
      contrastText: 'rgba(29, 34, 39, 0.87)',
    },
    secondary: {
      dark: 'rgba(204, 224, 255, 0.14)',
      main: 'rgba(204, 224, 255, 0.12)',
      light: 'rgba(204, 224, 255, 0.14)',
      contrastText: 'rgba(204, 224, 255, 1)',
    },
    tertiary: {
      dark: 'rgba(212, 241, 204, 1)',
      main: 'rgba(212, 241, 204, 1)',
      light: 'rgba(212, 241, 204, 0.12)',
    },
    grey: {
      '900': 'rgba(255, 255, 255, 1)',
      '800': 'rgba(255, 255, 255, 0.87)',
      '700': 'rgba(255, 255, 255, 0.38)',
      '600': 'rgba(255, 255, 255, 0.2)',
      '500': 'rgba(255, 255, 255, 0.11)',
      '400': 'rgba(255, 255, 255, 0.09)',
      '300': 'rgba(255, 255, 255, 0.03)',
      '200': 'rgba(255, 255, 255, 0.02)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.54)',
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
    buttonText: {
      primary: 'rgba(29, 34, 39, 0.87)',
      secondary: 'rgba(29, 34, 39, 0.54)',
      disabled: 'rgba(29, 34, 39, 0.38)',
    },
    background: {
      default: 'rgba(29, 34, 39, 1)',
      paper: 'rgba(45, 49, 54, 1)',
    },
    mode: 'dark',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  zIndex: {
    tooltip: 9999,
  },
});
