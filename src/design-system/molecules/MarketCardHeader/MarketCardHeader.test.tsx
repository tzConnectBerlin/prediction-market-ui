import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCardHeader } from './MarketCardHeader';

describe('Snapshot testing MarketCardHeader Component', () => {
  it('renders correctly with image icon', () => {
    const cardHeader = renderer
      .create(
        <MarketCardHeader
          title="Market card with image icon"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          timestamp={new Date('2021-03-22')}
        />,
      )
      .toJSON();
    expect(cardHeader).toMatchSnapshot();
  });

  it('renders correctly with hash generated icon', () => {
    const cardHeader = renderer
      .create(
        <MarketCardHeader
          title="Market card with image icon"
          hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
          timestamp={new Date('2021-03-22')}
        />,
      )
      .toJSON();
    expect(cardHeader).toMatchSnapshot();
  });

  it('renders correctly with different card label', () => {
    const cardHeader = renderer
      .create(
        <MarketCardHeader
          title="Auction step"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          cardLabel="Auction"
          timestamp={new Date('2021-03-22')}
        />,
      )
      .toJSON();
    expect(cardHeader).toMatchSnapshot();
  });

  it('renders correctly with short format date', () => {
    const cardHeader = renderer
      .create(
        <MarketCardHeader
          title="Market Title"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          timestampFormat={DATETIME_FORMAT.SHORT_FORMAT}
          timestamp={new Date('2021-03-22')}
        />,
      )
      .toJSON();
    expect(cardHeader).toMatchSnapshot();
  });

  it('renders correctly with closed time', () => {
    const cardHeader = renderer
      .create(
        <MarketCardHeader
          title="Closed Market"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
          timestamp={new Date('2021-03-18')}
        />,
      )
      .toJSON();
    expect(cardHeader).toMatchSnapshot();
  });
});

describe('Element testing MarketCardHeader Component', () => {
  it('render correctly with Auction label', async () => {
    const { getByText } = render(
      <MarketCardHeader
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
      <MarketCardHeader
        title="Market Title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        timestamp={new Date('2021-03-23')}
      />,
    );
    expect(getByText(/Market Title/i)).toBeInTheDocument();
  });

  it('render correctly with Closed Market', async () => {
    const { getByText } = render(
      <MarketCardHeader
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        timestamp={new Date('2021-03-18')}
      />,
    );
    expect(getByText(/Closed/i)).toBeInTheDocument();
  });

  it('render correctly with Close Time with short format', async () => {
    const { getByText } = render(
      <MarketCardHeader
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        timestamp={new Date('2022-03-23')}
        timestampFormat={DATETIME_FORMAT.SHORT_FORMAT}
      />,
    );
    expect(getByText(/23rd Mar 2022/i)).toBeInTheDocument();
  });
});
