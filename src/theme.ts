import { createTheme, PaletteOptions } from '@material-ui/core/styles';

const lightThemePalette: PaletteOptions = {
  primary: {
    dark: 'rgba(26, 117, 255, 1)',
    main: 'rgba(1, 102, 255, 1)',
    light: 'rgba(1, 102, 255, 0.12)',
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
    '400': 'rgba(29, 34, 39, 0.04)',
    '300': 'rgba(29, 34, 39, 0.03)',
    '200': 'rgba(29, 34, 39, 0.02)',
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
  // action: {
  //   disabledBackground: "#0166FF",
  //   disabled: "rgba(255,255,255,0.3)",
  // },
};

export const lightTheme = createTheme({
  palette: lightThemePalette,
});

export const darkTheme = createTheme({
  palette: {
    ...lightThemePalette,
    primary: {
      dark: 'rgba(214, 231, 255, 1)',
      main: 'rgba(204, 224, 255, 1)',
      light: 'rrgba(204, 224, 255, .12)',
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
  zIndex: {
    tooltip: 9999,
  },
});
