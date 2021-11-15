import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MarketCard, MarketCardProps } from './MarketCard';
import { TokenType } from '../../../interfaces/market';

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
      tokenType: TokenType.yes,
    },
    {
      type: 'VOLUME',
      value: '5',
    },
  ],
};

const WrappedComponent = (args: Omit<MarketCardProps, 'marketURL'>) => (
  <MemoryRouter>
    <MarketCard {...args} marketURL="" />
  </MemoryRouter>
);

describe('Snapshot testing MarketCard Component', () => {
  it('renders correctly with image icon', () => {
    const Card = renderer
      .create(
        <WrappedComponent
          title="Market card with image icon"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardState="Auction"
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
        <WrappedComponent
          title="Market card with image icon"
          hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
          cardState="Auction"
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders correctly with Market card label', () => {
    const Card = renderer
      .create(
        <WrappedComponent
          title="Market is open"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardState="Market"
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders correctly with closed time', () => {
    const Card = renderer
      .create(
        <WrappedComponent
          title="Closed Market"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardState="Market"
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });
});

describe('Element testing MarketCard Component', () => {
  it('render correctly with Auction label', async () => {
    const { getByText } = render(
      <WrappedComponent
        title="Market title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        cardState="Auction"
      />,
    );

    expect(getByText(/Auction/i)).toBeInTheDocument();
  });

  it('render correctly with Market title', async () => {
    const { getByText } = render(
      <WrappedComponent
        title="Market Title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        cardState="Market"
      />,
    );
    expect(getByText(/Market Title/i)).toBeInTheDocument();
  });

  it('render correctly statisticList', async () => {
    const { getByText } = render(
      <WrappedComponent
        title="Market Title"
        cardState="Auction"
        statisticList={defaultContentProps.statisticList as any}
      />,
    );

    expect(getByText(/WEEKLY/i)).toBeInTheDocument();
    expect(getByText(/VOLUME/i)).toBeInTheDocument();
  });

  it('render correctly tokenList', async () => {
    const { getByText, queryByText } = render(
      <WrappedComponent
        title="Market Title"
        cardState="Market"
        tokenList={defaultContentProps.tokenList}
      />,
    );

    expect(getByText(/Yes/i)).toBeInTheDocument();
    expect(queryByText(/Weekly/i)).not.toBeInTheDocument();
  });
});
