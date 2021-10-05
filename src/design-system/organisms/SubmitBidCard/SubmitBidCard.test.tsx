import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/system';
import { SubmitBidCard, SubmitBidCardProps } from '.';
import { lightTheme } from '../../../styles/theme';

const defaultProps: SubmitBidCardProps = {
  handleSubmit: jest.fn(),
  tokenName: 'PMM',
  connected: true,
  currentPosition: {
    contribution: 50,
    probability: 50,
  },
};

const WrappedComponent = (args: Partial<SubmitBidCardProps>) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <SubmitBidCard {...defaultProps} {...args} />
    </ThemeProvider>
  );
};

describe('Snapshot testing SubmitBidCard', () => {
  it('renders correctly with default props', () => {
    const card = renderer.create(<WrappedComponent />).toJSON();
    expect(card).toMatchSnapshot();
  });
});

describe('Element testing SubmitBidCard Component', () => {
  it('render correctly default props', () => {
    const { getAllByText } = render(<WrappedComponent />);
    expect(getAllByText('probability').length).toBe(2);
  });

  it('render when wallet connection is not available', () => {
    const { getAllByText } = render(<WrappedComponent connected={false} />);
    expect(getAllByText('submitDisconnected').length).toBe(1);
  });
});
