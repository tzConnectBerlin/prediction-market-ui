import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { ActionBox, ActionBoxProps } from './ActionBox';
import { MarketStateType } from '../../../interfaces';
import { lightTheme } from '../../../styles/theme';

const closeMock = jest.fn();
const resolveMock = jest.fn();
const setMock = jest.fn();

const defaultArgs: ActionBoxProps = {
  adjudicator: 'tim',
  marketId: '1',
  marketPhase: MarketStateType.auctionRunning,
  handleCloseAuction: closeMock,
  handleResolveMarket: resolveMock,
  auctionParticipant: true,
  setCloseMarketId: setMock,
  closeMarketId: '',
};

const WrappedComponent: React.FC<ActionBoxProps> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <ActionBox {...args} />
  </ThemeProvider>
);

describe('Snapshot - render TradeForm', () => {
  it('renders correctly with default props', () => {
    const BuyForm = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(BuyForm).toMatchSnapshot();
  });
  it('calls close function', () => {
    const { getByRole } = render(<WrappedComponent {...defaultArgs} />);
    fireEvent.click(getByRole('button'));
    expect(closeMock).toBeCalled();
  });
  it('calls set function', () => {
    const { getByRole } = render(
      <WrappedComponent
        {...defaultArgs}
        marketPhase={MarketStateType.marketBootstrapped}
        address="tim"
      />,
    );
    fireEvent.click(getByRole('button'));
    expect(setMock).toBeCalled();
  });
  it('has a winning prediction', () => {
    const { findByRole, getByText } = render(
      <WrappedComponent
        {...defaultArgs}
        marketPhase={MarketStateType.marketBootstrapped}
        winningPrediction="yes"
      />,
    );
    expect(findByRole('button')).toMatchObject({});
    expect(getByText(/yes/i)).toBeInTheDocument();
  });
});
