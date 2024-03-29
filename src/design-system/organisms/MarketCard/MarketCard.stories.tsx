import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketCard, MarketCardProps } from './MarketCard';
import { TokenType } from '../../../interfaces/market';

export default {
  title: 'Organism/MarketCard',
  component: MarketCard,
} as Meta;

const Template: Story<MarketCardProps> = (args) => <MarketCard {...args} marketURL="" />;
const contentProps = {
  tokenList: [
    {
      type: TokenType.yes,
      value: 14,
    },
    {
      type: TokenType.no,
      value: 5,
    },
  ],
  statisticList: [
    {
      type: 'WEEKLY',
      value: '95',
      changes: 'up',
      tokenType: TokenType.yes,
    },
    {
      type: 'VOLUME',
      value: '5',
    },
  ],
};
export const WithMarketCloseDate = Template.bind({});
WithMarketCloseDate.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title: 'Market card with image icon',
  cardState: 'Market',
};

export const WithLongTitleText = Template.bind({});
WithLongTitleText.args = {
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  cardState: 'Market',
  tokenList: contentProps.tokenList,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'Auction step',
  iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
  cardState: 'Auction',
};

export const WithHashOnly = Template.bind({});
WithHashOnly.args = {
  hash: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
  title: 'Market card with hash generated icon',
  cardState: 'Auction',
  tokenList: contentProps.tokenList,
  statisticList: contentProps.statisticList,
};

export const WithMarketContent = Template.bind({});
WithMarketContent.args = {
  hash: 'QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3',
  title: 'Closed Market card with Matket Content',
  cardState: 'Market',
  tokenList: contentProps.tokenList,
  statisticList: contentProps.statisticList,
};
