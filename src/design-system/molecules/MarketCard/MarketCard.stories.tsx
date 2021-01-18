import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MarketCard, MarketCardProps } from '.';

export default {
  title: 'Molecule/MarketCard',
  component: MarketCard,
} as Meta;

const Template: Story<MarketCardProps> = (args) => <MarketCard {...args} />;

export const WithAuctionCloseText = Template.bind({});
WithAuctionCloseText.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title: 'Market card with image icon',
  auctionCloseText: 'Auction ends on',
  auctionTimestamp: new Date(new Date().getTime() + 100000),
  marketTimestamp: new Date(new Date().getTime() + 100000000),
};

export const WithMarketCloseText = Template.bind({});
WithMarketCloseText.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title: 'Market card with image icon',
  auctionCloseText: 'Auction ends on',
  marketCloseText: 'Market ends on',
  auctionTimestamp: new Date(new Date().getTime() - 100000),
  marketTimestamp: new Date(new Date().getTime() + 100000000),
};

export const WithHashOnly = Template.bind({});
WithHashOnly.args = {
  hash: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
  title: 'Market card with hash generated icon',
  auctionCloseText: 'Auction ends on',
  marketCloseText: 'Market ends on',
  auctionTimestamp: new Date(new Date().getTime() - 100000),
  marketTimestamp: new Date(new Date().getTime() + 100000000),
};

export const WithLongTitleText = Template.bind({});
WithLongTitleText.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  auctionCloseText: 'Auction ends on',
  marketCloseText: 'Market ends on',
  auctionTimestamp: new Date(new Date().getTime() - 100000),
  marketTimestamp: new Date(new Date().getTime() + 100000000),
};

export const ShowBothTimestamps = Template.bind({});
ShowBothTimestamps.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title: 'Market card with image icon',
  auctionCloseText: 'Auction ends on',
  marketCloseText: 'Market ends on',
  auctionTimestamp: new Date(new Date().getTime() - 100000),
  marketTimestamp: new Date(new Date().getTime() + 100000000),
  showAllTimeStamps: true,
};
