import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCard } from './MarketCard';
import { Currency, QuestionStateType, TokenType } from '../../../interfaces/market';

const defaultContentProps = {
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
      currency: Currency.USD,
      tokenType: TokenType.yes,
    },
    {
      type: 'VOLUME',
      value: '5',
      currency: Currency.USD,
    },
  ],
};
describe('Snapshot testing MarketCard Component', () => {
  it('renders correctly with image icon', () => {
    const Card = renderer
      .create(
        <MarketCard
          title="Market card with image icon"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardState="Auction"
          closeDate="6th May 2021 09:32"
          tokenList={defaultContentProps.tokenList}
          statisticList={defaultContentProps.statisticList as any}
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders correctly with hash generated icon', () => {
    const Card = renderer
      .create(
        <MarketCard
          title="Market card with image icon"
          hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
          cardState="Auction"
          closeDate="6th May 2021 09:32"
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders correctly with Market card label', () => {
    const Card = renderer
      .create(
        <MarketCard
          title="Market is open"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardState="Market"
          closeDate="6th May 2021 09:32"
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders correctly with closed time', () => {
    const Card = renderer
      .create(
        <MarketCard
          title="Closed Market"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardState="Market"
          closeDate="Closed"
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });
});

describe('Element testing MarketCard Component', () => {
  it('render correctly with Auction label', async () => {
    const { getByText } = render(
      <MarketCard
        title="Market title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        cardState="Auction"
        closeDate="Closed"
      />,
    );

    expect(getByText(/Auction/i)).toBeInTheDocument();
  });

  it('render correctly with Market title', async () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        cardState="Market"
        closeDate="6th May 2021 09:32"
      />,
    );
    expect(getByText(/Market Title/i)).toBeInTheDocument();
  });

  it('render correctly with Closed Market', async () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        cardState="Market"
        closeDate="Closed"
      />,
    );
    expect(getByText(/Closed/i)).toBeInTheDocument();
  });

  it('render correctly with Close Time format', () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        cardState="Auction"
        closeDate="6th May 2021 09:32"
      />,
    );
    expect(getByText(/6th May 2021 09:32/i)).toBeInTheDocument();
  });

  it('render correctly statisticList', async () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        cardState="Auction"
        closeDate="6th May 2021 09:32"
        statisticList={defaultContentProps.statisticList as any}
      />,
    );

    expect(getByText(/WEEKLY/i)).toBeInTheDocument();
    expect(getByText(/VOLUME/i)).toBeInTheDocument();
  });

  it('render correctly tokenList', async () => {
    const { getByText, queryByText } = render(
      <MarketCard
        title="Market Title"
        cardState="Market"
        closeDate="6th May 2021 09:32"
        tokenList={defaultContentProps.tokenList}
      />,
    );

    expect(getByText(/Yes/i)).toBeInTheDocument();
    expect(queryByText(/Weekly/i)).not.toBeInTheDocument();
  });
});
