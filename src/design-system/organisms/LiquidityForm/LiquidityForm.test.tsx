import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/system';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';
import { lightTheme } from '../../../styles/theme';

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

const WrappedComponent = (props: LiquidityFormProps) => (
  <ThemeProvider theme={lightTheme}>
    <LiquidityForm {...props} />
  </ThemeProvider>
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
