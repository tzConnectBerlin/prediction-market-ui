import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';
import { MarketTradeType } from '../../../interfaces';

const basArgs = {
  tokenName: 'PMM',
  title: 'Add Liquidity',
};

const defaultArgs: LiquidityFormProps = {
  ...basArgs,
  tradeType: MarketTradeType.payIn,
  handleSubmit: jest.fn(),
};

describe('Snapshot - render LiquidityForm', () => {
  it('renders correctly with default props', () => {
    const AddLiquidityForm = renderer.create(<LiquidityForm {...defaultArgs} />).toJSON();
    expect(AddLiquidityForm).toMatchSnapshot();
  });
});

describe('Element testing LiquidityForm Component', () => {
  it('render correctly LiquidityForm with default props', async () => {
    const { getAllByText } = render(<LiquidityForm {...defaultArgs} />);
    expect(getAllByText(/Add Liquidity/i).length).toBe(1);
  });

  it('render correctly LiquidityForm with different Title', async () => {
    const { getAllByText } = render(<LiquidityForm {...defaultArgs} title=" Liquidity" />);
    expect(getAllByText(/ Liquidity/i).length).toBe(1);
  });
});
