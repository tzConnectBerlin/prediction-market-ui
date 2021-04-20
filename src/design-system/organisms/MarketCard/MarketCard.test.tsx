import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { lightTheme as theme } from '../../../theme';
import { MarketCard } from './MarketCard';

const defaultContentProps = {
  tokenList: [
    {
      label: 'YES',
      value: '95$',
      valueColor: theme.palette.success.main,
    },
    {
      label: 'NO',
      value: '5$',
      valueColor: theme.palette.error.main,
    },
  ],
  statisticList: [
    {
      label: 'WEEKLY',
      value: 'YES 95$',
      valueColor: theme.palette.success.main,
      changes: 'up',
    },
    {
      label: 'VOLUME',
      value: '5$',
      valueColor: theme.palette.text.primary,
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
          timestamp={new Date('2021-03-22')}
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
          timestamp={new Date('2021-03-22')}
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders correctly with different card label', () => {
    const Card = renderer
      .create(
        <MarketCard
          title="Auction step"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardLabel="Auction"
          timestamp={new Date('2021-03-22')}
        />,
      )
      .toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders correctly with short format date', () => {
    const Card = renderer
      .create(
        <MarketCard
          title="Market Title"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          timestampFormat={DATETIME_FORMAT.SHORT_FORMAT}
          timestamp={new Date('2021-03-22')}
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
          timestamp={new Date('2021-03-18')}
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
        cardLabel="Auction"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        timestamp={new Date('2021-03-22')}
      />,
    );

    expect(getByText(/Auction/i)).toBeInTheDocument();
  });

  it('render correctly with Market title', async () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        timestamp={new Date('2021-03-23')}
      />,
    );
    expect(getByText(/Market Title/i)).toBeInTheDocument();
  });

  it('render correctly with Closed Market', async () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        timestamp={new Date('2021-03-18')}
      />,
    );
    expect(getByText(/Closed/i)).toBeInTheDocument();
  });

  it('render correctly with Close Time with short format', () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        timestamp={new Date('2022-03-23')}
        timestampFormat={DATETIME_FORMAT.SHORT_FORMAT}
      />,
    );
    expect(getByText(/23rd Mar 2022/i)).toBeInTheDocument();
  });

  it('render correctly statisticList', async () => {
    const { getByText } = render(
      <MarketCard
        title="Market Title"
        timestamp={new Date('2021-03-18')}
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
        timestamp={new Date('2021-03-18')}
        tokenList={defaultContentProps.tokenList}
      />,
    );

    expect(getByText(/YES/i)).toBeInTheDocument();
    expect(queryByText(/WEEKLY/i)).not.toBeInTheDocument();
  });
});
