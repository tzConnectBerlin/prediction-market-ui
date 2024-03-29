import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { lightTheme as theme } from '../../../styles/theme';
import { ProfilePopover, ProfilePopoverProps } from './ProfilePopover';

export default {
  title: 'Molecule/ProfilePopover',
  component: ProfilePopover,
} as Meta;

const Template: Story<ProfilePopoverProps> = (args) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ProfilePopover {...args} />
    </ThemeProvider>
  </BrowserRouter>
);

export const OpenedPopover = Template.bind({});
OpenedPopover.args = {
  address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
  network: 'edonet',
  stablecoinSymbol: 'PMM',
  userBalance: 200,
  actionText: 'Disconnect Wallet',
  isOpen: true,
  handleAction: () => {},
  onClose: () => {},
};

export const OneLink = Template.bind({});
OneLink.args = {
  address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
  network: 'edonet',
  stablecoinSymbol: 'PMM',
  userBalance: 200,
  actionText: 'Disconnect Wallet',
  links: [{ label: 'My Account', url: '#' }],
  isOpen: true,
  handleAction: () => {},
  onClose: () => {},
};

export const MultiLinks = Template.bind({});
MultiLinks.args = {
  address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
  network: 'edonet',
  stablecoinSymbol: 'PMM',
  userBalance: 200,
  actionText: 'Disconnect Wallet',
  links: [
    { label: 'My Account', url: '#' },
    { label: 'My Account', url: '#' },
  ],
  isOpen: true,
  handleAction: () => {},
  onClose: () => {},
};
