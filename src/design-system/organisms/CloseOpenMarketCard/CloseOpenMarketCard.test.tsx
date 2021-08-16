import renderer from 'react-test-renderer';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import { ToastProvider } from 'react-toast-notifications';
import { CloseOpenMarketCard, CloseOpenMarketProps } from './CloseOpenMarketCard';
import { MarketStateType, MarketTradeType } from '../../../interfaces';

const defaultArgs = {
  adjudicator: 'tim',
  marketId: '1',
  marketPhase: MarketStateType.auctionRunning,
};

const WrappedComponent: React.FC<any> = (args: any) => (
  <ToastProvider>
    <CloseOpenMarketCard {...args} />
  </ToastProvider>
);

describe('Snapshot - render TradeForm', () => {
  it('renders correctly with default props', () => {
    const BuyForm = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(BuyForm).toMatchSnapshot();
  });
});
