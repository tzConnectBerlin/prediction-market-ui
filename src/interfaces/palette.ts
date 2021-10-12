import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    buttonText: Palette['text'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
    buttonText: PaletteOptions['text'];
  }
}
