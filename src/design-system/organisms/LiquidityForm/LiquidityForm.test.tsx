import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from '@mui/system';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';
import { lightTheme } from '../../../styles/theme';

const basicArgs = {
  tokenName: 'PMM',
  title: 'Add Liquidity',
  marketId: '3',
  poolTotalSupply: 100,
};
const queryClient = new QueryClient();
const defaultArgs: LiquidityFormProps = {
  ...basicArgs,
  operationType: 'add',
  handleSubmit: jest.fn(),
};

const WrappedComponent = (props: LiquidityFormProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={lightTheme}>
      <LiquidityForm {...props} />
    </ThemeProvider>
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
    const { getAllByText } = render(<WrappedComponent {...defaultArgs} connected />);
    expect(getAllByText(/ Liquidity/i).length).toBe(1);
  });
});
