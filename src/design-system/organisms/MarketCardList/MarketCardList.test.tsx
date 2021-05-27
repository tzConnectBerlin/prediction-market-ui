import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Currency, MarketCardData, TokenType } from '../../../interfaces';
import { MarketCardList } from './MarketCardList';

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
    statistics: [
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
describe('Snapshot testing MarketCardList Component', () => {
  it('renders correctly', () => {
    const List = renderer.create(<MarketCardList cardList={dataList} />).toJSON();
    expect(List).toMatchSnapshot();
  });
});

describe('Element testing MarketCardList Component', () => {
  it('render correctly 1 item', () => {
    const { getAllByText } = render(<MarketCardList cardList={dataList} />);

    expect(getAllByText('VOLUME').length).toBe(1);
  });
});
