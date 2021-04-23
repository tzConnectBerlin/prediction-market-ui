import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MarketCardList } from './MarketCardList';

const queryClient = new QueryClient();

jest.mock('../../../api/queries', () => ({
  useMarketCards: () => ({
    data: [
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
            type: 'No',
            value: '14',
          },
          {
            type: 'Yes',
            value: '5',
          },
        ],
        statisticks: [
          {
            type: 'weekly',
            changes: 'up',
            value: '+3',
            tokenType: 'Yes',
            currency: 'USD',
          },
          {
            type: 'volume',
            value: '123,456.47',
            currency: 'USD',
          },
        ],
      },
    ],
    isLoading: false,
  }),
}));

describe('Snapshot testing MarketCardList Component', () => {
  it('renders correctly', () => {
    const List = renderer
      .create(
        <QueryClientProvider client={queryClient}>
          <MarketCardList />
        </QueryClientProvider>,
      )
      .toJSON();
    expect(List).toMatchSnapshot();
  });
});

describe('Element testing MarketCardList Component', () => {
  it('render correctly 1 item', async () => {
    const { findAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <MarketCardList />
      </QueryClientProvider>,
    );
    expect((await findAllByText('volume')).length).toBe(1);
  });
});
