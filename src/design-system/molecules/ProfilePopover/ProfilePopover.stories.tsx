import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme as theme } from '../../../theme';
import { ProfilePopover, ProfilePopoverProps } from './ProfilePopover';

export default {
  title: 'Molecule/ProfilePopover',
  component: ProfilePopover,
} as Meta;

const Template: Story<ProfilePopoverProps> = (args) => (
  <ThemeProvider theme={theme}>
    <ProfilePopover {...args} />
  </ThemeProvider>
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
  links: [{ label: 'My Account', address: '#' }],
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
    { label: 'My Account', address: '#' },
    { label: 'My Account', address: '#' },
  ],
  isOpen: true,
  handleAction: () => {},
  onClose: () => {},
};
