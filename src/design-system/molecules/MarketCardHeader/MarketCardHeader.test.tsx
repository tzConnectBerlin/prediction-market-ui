import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MarketCardHeader } from './MarketCardHeader';

describe('Snapshot testing MarketCardHeader Component', () => {
  it('renders correctly with image icon', () => {
    const cardHeader = renderer
      .create(
        <MarketCardHeader
          cardState="Auction"
          title="Market card with image icon"
          iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        />,
      )
      .toJSON();
    expect(cardHeader).toMatchSnapshot();
  });

  it('renders correctly with hash generated icon', () => {
    const cardHeader = renderer
      .create(
        <MarketCardHeader
          cardState="Auction"
          title="Market card with image icon"
          hash="QmYgtfMBZo3ajW5rmUesVfHSJu5nT6fT3cRcvr2fpfbzo3"
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
      />,
    );

    expect(getByText(/Auction/i)).toBeInTheDocument();
  });

  it('render correctly with Market title', async () => {
    const { getByText } = render(
      <MarketCardHeader
        title="Market Title"
        iconURL="https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg"
        cardState="Market"
      />,
    );
    expect(getByText(/Market Title/i)).toBeInTheDocument();
  });
});
