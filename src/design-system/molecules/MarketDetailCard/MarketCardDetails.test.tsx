import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { MarketDetailCard } from './MarketDetailCard';

const descriptionArgs = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'.repeat(20),
  expandActionText: 'Read more',
  shrinkActionText: 'Read less',
};

const defaultProps = {
  title: 'About Market',
  items: [
    {
      title: 'Description',
      item: descriptionArgs,
    },
    {
      title: 'Ticker',
      item: '$TZBDN',
    },
  ],
};

describe('Snapshot testing MarketDetailCard Component', () => {
  it('renders correctly default data', () => {
    const marketDetailCard = renderer.create(<MarketDetailCard {...defaultProps} />).toJSON();
    expect(marketDetailCard).toMatchSnapshot();
  });
});

describe('Element testing MarketDetailCard Component', () => {
  it('render correctly with given data', async () => {
    const { getByText } = render(<MarketDetailCard {...defaultProps} />);
    expect(getByText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Ticker/i)).toBeInTheDocument();
  });
});
