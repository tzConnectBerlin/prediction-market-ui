import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MarketCardData, MarketStateType, TokenType } from '../../../interfaces';
import { MarketCardList } from './MarketCardList';
import { DATETIME_FORMAT } from '../../../globals';

const dataList: MarketCardData[] = [
  {
    marketId: '1',
    bakedAt: '',
    block: 1,
    adjudicator: 'tk1111',
    description: 'This is sample description',
    question: 'This is a question',
    auctionEndDate: '2021-04-06',
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
describe('Snapshot testing MarketCardList Component', () => {
  it('renders correctly', () => {
    const List = renderer
      .create(
        <MemoryRouter>
          <MarketCardList cardList={dataList} timestampFormat={DATETIME_FORMAT.SHORT_FORMAT} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(List).toMatchSnapshot();
  });
});

describe('Element testing MarketCardList Component', () => {
  it('render correctly 1 item', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <MarketCardList cardList={dataList} />
      </MemoryRouter>,
    );

    expect(getAllByText('liquidity').length).toBe(1);
  });
});
