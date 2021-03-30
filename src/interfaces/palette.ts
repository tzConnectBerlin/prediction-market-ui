import '@material-ui/core/styles';

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
