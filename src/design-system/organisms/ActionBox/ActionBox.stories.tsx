import * as React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ActionBox, ActionBoxProps } from './ActionBox';
import { MarketStateType } from '../../../interfaces';

export default {
  title: 'Organism/ActionBox',
  component: ActionBox,
} as Meta;

const Template: Story<ActionBoxProps> = (args) => (
  <WalletProvider name="Temple">
    <ToastProvider>
      <ActionBox {...args} />
    </ToastProvider>
  </WalletProvider>
);

export const Default = Template.bind({});

export const Resolved = Template.bind({});
Resolved.args = {
  marketId: '1',
  marketPhase: MarketStateType.marketBootstrapped,
  winningPrediction: 'yes',
};
