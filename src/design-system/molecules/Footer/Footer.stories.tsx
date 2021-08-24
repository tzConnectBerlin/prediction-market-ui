import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme as theme } from '../../../styles/theme';
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

export const WithTitleAndText = Template.bind({});
WithTitleAndText.args = {
  title: 'About Tezos Prediction Markets',
  description: [
    'This software implements a crowd-funded prediction market. Once the market has been initiated by setting the question and other details, other participants can give their own assessments of the likelihood of the question coming true, and investing in the market. Not only will these initial participants have a stake in the market, they will also profit from its operation, taking a share of the market’s fees.',
    'From then on the market operates in a standard way–each token will pay out to one or zero coins,depending upon which way events transpire. A 5% fee on winnings rewards participants in the investment phase, and those who have contributed liquidity to the market during its operation.',
  ],
  links: [
    {
      label: 'HOW IT WORKS',
    },
    {
      label: 'ABOUT TEZOS',
      isExternal: true,
    },
  ],
};

export const WithMoreLinks = Template.bind({});
WithMoreLinks.args = {
  title: 'About Tezos Prediction Markets',
  description: [
    'This software implements a crowd-funded prediction market. Once the market has been initiated by setting the question and other details, other participants can give their own assessments of the likelihood of the question coming true, and investing in the market. Not only will these initial participants have a stake in the market, they will also profit from its operation, taking a share of the market’s fees.',
    'From then on the market operates in a standard way–each token will pay out to one or zero coins,depending upon which way events transpire. A 5% fee on winnings rewards participants in the investment phase, and those who have contributed liquidity to the market during its operation.',
  ],
  links: [
    {
      label: 'HOW IT WORKS',
    },
    {
      label: 'ABOUT TEZOS',
      isExternal: true,
    },
    {
      label: 'HOW IT WORKS',
    },
    {
      label: 'ABOUT TEZOS',
      isExternal: true,
    },
    {
      label: 'HOW IT WORKS',
    },
    {
      label: 'ABOUT TEZOS',
      isExternal: true,
    },
  ],
};
