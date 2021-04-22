import '@material-ui/core/styles';

declare module '@material-ui/core/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    buttonText: Palette['text'];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
    buttonText: PaletteOptions['text'];
  }
}
