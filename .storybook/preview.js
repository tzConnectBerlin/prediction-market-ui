import React, { Suspense } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from '@mui/material';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../src/styles/style';
import { lightTheme as theme } from '../src/styles/theme';
import '../src/i18n';

const queryClient = new QueryClient();
// Global decorator to apply the GlobalStyle to all stories
export const decorators = [
  (Story) => (
    <Suspense fallback="Loading...">
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Global styles={GlobalStyle(theme)} />
          <Story />
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
