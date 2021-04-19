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
          closeDate={new Date('2021-03-22').toString()}
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
          closeDate={new Date('2021-03-22').toString()}
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
          cardState="Auction"
          closeDate={new Date('2021-03-22').toString()}
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
        cardState="Auction"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        closeDate={new Date('2021-03-22').toString()}
      />,
    );

    expect(getByText(/Auction/i)).toBeInTheDocument();
  });

  it('render correctly with Market title', async () => {
    const { getByText } = render(
      <MarketCardHeader
        title="Market Title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        closeDate={new Date('2021-03-23').toString()}
      />,
    );
    expect(getByText(/Market Title/i)).toBeInTheDocument();
  });

  it('render correctly with Closed Market', async () => {
    const { getByText } = render(
      <MarketCardHeader
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        closeDate="Closed"
      />,
    );
    expect(getByText(/Closed/i)).toBeInTheDocument();
  });

  it('render correctly with Close Time format', async () => {
    const { getByText } = render(
      <MarketCardHeader
        title="Market Title"
        hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
        closeDate="6th May 2021 09:32"
      />,
    );
    expect(getByText(/6th May 2021 09:32/i)).toBeInTheDocument();
  });
});
