import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { TradeForm, TradeFormProps } from './TradeForm';
import { MarketTradeType } from '../../../interfaces';
import { lightTheme } from '../../../styles/theme';

const outcomeItems = [
  {
    value: '12$',
    label: 'Yes',
  },
  {
    value: '8$',
    label: 'No',
  },
];

const basArgs = {
  tokenName: 'PMM',
  title: 'Buy',
  outcomeItems,
};

const defaultArgs: TradeFormProps = {
  ...basArgs,
  connected: true,
  tradeType: MarketTradeType.payIn,
  handleSubmit: jest.fn(),
  handleRefreshClick: jest.fn(),
  disabled: false,
  handleClaimWinnings: jest.fn(),
  marketId: '1',
};

const WrappedComponent = (args: TradeFormProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <TradeForm {...defaultArgs} {...args} />
    </ThemeProvider>
  );
};

describe('Snapshot - render TradeForm', () => {
  it('renders correctly with default props', () => {
    const BuyForm = renderer
      .create(<WrappedComponent {...defaultArgs} connected={false} />)
      .toJSON();
    expect(BuyForm).toMatchSnapshot();
  });
});

describe('Element testing TradeForm Component', () => {
  it('render correctly TradeForm with default props', async () => {
    const { getByText } = render(<WrappedComponent {...defaultArgs} />);

    expect(getByText(/Yes/i)).toBeInTheDocument();
    expect(getByText(/No/i)).toBeInTheDocument();
  });

  it('render correctly TradeForm with correct Title', async () => {
    const { getAllByText } = render(<WrappedComponent {...defaultArgs} />);
    expect(getAllByText(/Buy/i).length).toBe(1);
  });
  it('render correctly TradeForm with different Title', async () => {
    const { getAllByText } = render(<WrappedComponent {...defaultArgs} title="Sell" />);
    expect(getAllByText(/Sell/i).length).toBe(1);
  });

  it('check refreshChip gets called', async () => {
    const { findAllByRole } = render(<WrappedComponent {...defaultArgs} />);
    const components = await findAllByRole('button');
    act(() => {
      fireEvent.click(components[0]);
    });
    expect(defaultArgs.handleRefreshClick).toBeCalled();
  });
});
