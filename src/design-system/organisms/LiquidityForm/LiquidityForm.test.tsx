import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';

const basicArgs = {
  tokenName: 'PMM',
  title: 'Add Liquidity',
  marketId: '3',
  poolTotalSupply: 100,
};

const defaultArgs: LiquidityFormProps = {
  ...basicArgs,
  operationType: 'add',
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
    const { getAllByText } = render(<LiquidityForm {...defaultArgs} title="Remove Liquidity" />);
    expect(getAllByText(/Remove Liquidity/i).length).toBe(1);
  });
});
