import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../theme';
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
  stablecoinSymbol: 'USDtz',
  actionText: 'Disconnect Wallet',
  isOpen: true,
  handleAction: () => {},
  onClose: () => {},
};
