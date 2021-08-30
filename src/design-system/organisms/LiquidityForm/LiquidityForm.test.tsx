import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';

const basArgs = {
  tokenName: 'PMM',
  title: 'Add Liquidity',
};
const queryClient = new QueryClient();
const defaultArgs: LiquidityFormProps = {
  ...basArgs,
  marketId: '1',
  operationType: 'add',
  poolTotalSupply: 10000,
  handleSubmit: jest.fn(),
};

const WrappedComponent = (props: LiquidityFormProps) => (
  <QueryClientProvider client={queryClient}>
    <LiquidityForm {...props} />
  </QueryClientProvider>
);
describe('Snapshot - render LiquidityForm', () => {
  it('renders correctly with default props', () => {
    const AddLiquidityForm = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(AddLiquidityForm).toMatchSnapshot();
  });
});

describe('Element testing LiquidityForm Component', () => {
  it('render correctly LiquidityForm with default props', async () => {
    const { getAllByText } = render(<WrappedComponent {...defaultArgs} />);
    expect(getAllByText(/Add Liquidity/i).length).toBe(1);
  });

  it('render correctly LiquidityForm with different Title', async () => {
    const { getAllByText } = render(<WrappedComponent {...defaultArgs} title=" Liquidity" />);
    expect(getAllByText(/ Liquidity/i).length).toBe(1);
  });
});
