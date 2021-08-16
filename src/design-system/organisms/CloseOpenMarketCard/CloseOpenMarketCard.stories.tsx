import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CloseOpenMarketCard, CloseOpenMarketProps } from './CloseOpenMarketCard';
import { MarketStateType } from '../../../interfaces';

export default {
  title: 'Organism/CloseOpenMarketCard',
  component: CloseOpenMarketCard,
} as Meta;

const outcomeItems = {
  adjudicator: 'tim',
  marketId: '1',
  marketPhase: MarketStateType.auctionRunning,
};

const Template: Story<CloseOpenMarketProps> = (args) => (
  <WalletProvider name="Temple">
    <ToastProvider>
      <CloseOpenMarketCard {...args} />
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
