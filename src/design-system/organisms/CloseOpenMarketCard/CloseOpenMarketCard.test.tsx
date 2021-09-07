import renderer from 'react-test-renderer';
import { CloseOpenMarketCard } from './CloseOpenMarketCard';
import { MarketStateType } from '../../../interfaces';

const defaultArgs = {
  adjudicator: 'tim',
  marketId: '1',
  marketPhase: MarketStateType.auctionRunning,
};

const WrappedComponent: React.FC<any> = (args: any) => <CloseOpenMarketCard {...args} />;

describe('Snapshot - render TradeForm', () => {
  it('renders correctly with default props', () => {
    const BuyForm = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(BuyForm).toMatchSnapshot();
  });
});
