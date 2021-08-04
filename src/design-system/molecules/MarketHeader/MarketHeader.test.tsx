import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { lightTheme as theme } from '../../../theme';
import { MarketHeader, MarketHeaderProps } from './MarketHeader';

const defaultProps: MarketHeaderProps = {
  title: 'Will Biden be the President of the United States on May 1, 2021?',
  cardState: 'Auction',
  iconURL: 'https://w.wallhaven.cc/full/rd/wallhaven-rd3pjw.jpg',
  cardStateProps: {
    fontColor: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  },
  stats: [
    {
      label: 'Consensus Probability',
      value: '0.50',
    },
    {
      label: 'Participants',
      value: '1',
    },
  ],
};

describe('Snapshot testing MarketHeader Component', () => {
  it('renders correctly', () => {
    const cardHeader = renderer.create(<MarketHeader {...defaultProps} />).toJSON();
    expect(cardHeader).toMatchSnapshot();
  });
});

describe('Element testing MarketHeader Component', () => {
  it('render correctly with Auction label', async () => {
    const { getByText } = render(<MarketHeader {...defaultProps} />);
    expect(getByText(/Auction/i)).toBeInTheDocument();
  });
});
