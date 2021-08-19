import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketCardData, MarketStateType, TokenType } from '../../../interfaces/market';
import { MarketCardList, MarketCardListProps } from './MarketCardList';

export default {
  title: 'Organism/MarketCardList',
  component: MarketCardList,
} as Meta;

const Template: Story<MarketCardListProps> = (args) => <MarketCardList {...args} />;
const dataList: MarketCardData[] = [
  {
    marketId: '1',
    block: 1,
    adjudicator: 'tk1111',
    description: 'This is sample description',
    question: 'This is a question',
    auctionEndDate: '2021-04-06T07:19:00.000Z',
    yesPrice: 0.5,
    state: MarketStateType.auctionRunning,
    ipfsHash: '',
    iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
    ticker: 'ticker',
    bakedAt: '2021-06-08T15:36:11+02:00',
    tokens: [
      {
        type: TokenType.yes,
        value: 14,
      },
      {
        type: TokenType.no,
        value: 5,
      },
    ],
    statistics: [
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
  },
  {
    marketId: '1',
    block: 1,
    bakedAt: '',
    adjudicator: 'tk1111',
    description: 'This is sample description',
    question: 'This is a question',
    auctionEndDate: '2021-04-06T07:19:00.000Z',
    yesPrice: 0.5,
    state: MarketStateType.auctionRunning,
    ipfsHash: '',
    iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
    ticker: 'ticker',
    tokens: [
      {
        type: TokenType.yes,
        value: 14,
      },
      {
        type: TokenType.no,
        value: 5,
      },
    ],
    statistics: [
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
  },
  {
    marketId: '1',
    block: 1,
    bakedAt: '',
    adjudicator: 'tk1111',
    description: 'This is sample description',
    question: 'This is a question',
    auctionEndDate: '2021-04-06T07:19:00.000Z',
    yesPrice: 0.5,
    state: MarketStateType.auctionRunning,
    ipfsHash: '',
    iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
    ticker: 'ticker',
    tokens: [
      {
        type: TokenType.yes,
        value: 14,
      },
      {
        type: TokenType.no,
        value: 5,
      },
    ],
    statistics: [
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
  },
  {
    marketId: '1',
    block: 1,
    bakedAt: '',
    adjudicator: 'tk1111',
    description: 'This is sample description',
    question: 'This is a question',
    auctionEndDate: '2021-04-06T07:19:00.000Z',
    yesPrice: 0.5,
    state: MarketStateType.auctionRunning,
    ipfsHash: '',
    iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
    ticker: 'ticker',
    tokens: [
      {
        type: TokenType.yes,
        value: 14,
      },
      {
        type: TokenType.no,
        value: 5,
      },
    ],
    statistics: [
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
  },
  {
    marketId: '1',
    block: 1,
    bakedAt: '',
    adjudicator: 'tk1111',
    description: 'This is sample description',
    question: 'This is a question',
    auctionEndDate: '2021-04-06T07:19:00.000Z',
    yesPrice: 0.5,
    state: MarketStateType.auctionRunning,
    ipfsHash: '',
    iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
    ticker: 'ticker',
    tokens: [
      {
        type: TokenType.yes,
        value: 14,
      },
      {
        type: TokenType.no,
        value: 5,
      },
    ],
    statistics: [
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
  },
];
export const Default = Template.bind({});
Default.args = {
  cardList: dataList,
};
