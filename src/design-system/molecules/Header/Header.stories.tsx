import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ThemeProvider } from '@material-ui/core';
import { lightTheme as theme } from '../../../styles/theme';
import { Header, HeaderProps } from './Header';

export default {
  title: 'Molecule/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Header {...args} />
  </ThemeProvider>
);

const wallet = {
  network: 'edonet',
  pkh: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  walletAvailable: true,
  address: wallet.pkh,
  network: wallet.network,
  stablecoinSymbol: 'PMM',
  actionText: 'Disconnect Wallet',
  primaryActionText: 'Sign in',
  handleConnect: () => {},
  handleDisconnect: () => {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  walletAvailable: false,
  address: wallet.pkh,
  network: wallet.network,
  stablecoinSymbol: 'PMM',
  actionText: 'Disconnect Wallet',
  primaryActionText: 'Sign in',
  handleConnect: () => {},
  handleDisconnect: () => {},
};
