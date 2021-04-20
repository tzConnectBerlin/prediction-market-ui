import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../../../theme';
import { Footer, FooterProps } from './Footer';

export default {
  title: 'Molecule/Footer',
  component: Footer,
} as Meta;

const Template: Story<FooterProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Footer {...args} />
  </ThemeProvider>
);
