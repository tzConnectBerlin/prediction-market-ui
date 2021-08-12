import renderer from 'react-test-renderer';
import { PortfolioSummary, PortfolioSummaryProps } from './PortfolioSummary';
import { Currency } from '../../../interfaces/market';

const defaultContentProps: PortfolioSummaryProps = {
  positions: [
    {
      type: 'trading',
      value: 95,
      currency: Currency.USD,
      weekly: 10,
    },
    {
      type: 'liquidity',
      value: 50,
      currency: Currency.USD,
      weekly: 10,
    },
  ],
  weekly: true,
};
describe('Snapshot testing PortfolioSummary Component', () => {
  it('renders correctly with weekly data', () => {
    const Card = renderer.create(<PortfolioSummary {...defaultContentProps} />).toJSON();
    expect(Card).toMatchSnapshot();
  });
});
