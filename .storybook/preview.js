import React from 'react';

import { ThemeProvider } from '@material-ui/core';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../src/assets/styles/style';
import { lightTheme as theme } from '../src/theme';

// Global decorator to apply the GlobalStyle to all stories
export const decorators = [
  (Story) => (
    <>
      <Global styles={GlobalStyle(theme)} />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
