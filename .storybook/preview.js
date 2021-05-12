import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from '@material-ui/core';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../src/assets/styles/style';
import { lightTheme as theme } from '../src/theme';

const queryClient = new QueryClient();
// Global decorator to apply the GlobalStyle to all stories
export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Global styles={GlobalStyle(theme)} />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </QueryClientProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
