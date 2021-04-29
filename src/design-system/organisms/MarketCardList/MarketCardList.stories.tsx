import { Story, Meta } from '@storybook/react/types-6-0';
import { Currency, MarketCardData, TokenType } from '../../../interfaces/market';
import { MarketCardList, MarketCardListProps } from './MarketCardList';

export default {
  title: 'Organism/MarketCardList',
  component: MarketCardList,
} as Meta;

const Template: Story<MarketCardListProps> = (args) => <MarketCardList {...args} />;
const dataList: MarketCardData[] = [
  {
    question: 'This is a question',
    marketCloseDate: '2021-04-06T07:32:00.000Z',
    auctionEndDate: '2021-04-06T07:19:00.000Z',
    yesAnswer: 'No',
    yesPrice: 0.5,
    state: 'questionAuctionOpen',
    hash: '',
    iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
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
    statisticks: [
      {
        type: 'WEEKLY',
        value: '95',
        changes: 'up',
        currency: Currency.USD,
        tokenType: TokenType.yes,
      },
      {
        type: 'VOLUME',
        value: '5',
        currency: Currency.USD,
      },
    ],
  },
];
export const Default = Template.bind({});
Default.args = {
  cardList: dataList,
};
