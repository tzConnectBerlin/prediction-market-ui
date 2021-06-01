import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MyAccountCard, MyAccountCardProps } from '.';

export default {
  title: 'Molecule/MyAccountCard',
  component: MyAccountCard,
} as Meta;

const Template: Story<MyAccountCardProps> = (args) => <MyAccountCard {...args} />;

export const Base = Template.bind({});
Base.args = {
  title: 'Wallet',
  walletLabel: 'Wallet',
  walletName: 'Temple',
  keyLabel: 'Key',
  address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
  balanceLabel: 'Balance',
  balance: 0,
};
