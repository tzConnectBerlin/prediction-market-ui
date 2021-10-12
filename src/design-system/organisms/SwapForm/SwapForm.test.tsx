import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { SwapForm, SwapFormProps } from './SwapForm';
import { TokenType } from '../../../interfaces';
import { lightTheme } from '../../../styles/theme';

const basicArgs = {
  tokenName: 'PMM',
  title: 'Swap Yes',
  marketId: '3',
};

const defaultArgs: SwapFormProps = {
  ...basicArgs,
  connected: true,
  swapTokenType: TokenType.yes,
  handleSubmit: jest.fn(),
};

const WrappedComponent: React.FC<Partial<SwapFormProps>> = (args) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <SwapForm {...defaultArgs} {...args} />
    </ThemeProvider>
  );
};

describe('Snapshot - render SwapForm', () => {
  it('renders correctly with default props', () => {
    const AddSwapForm = renderer.create(<WrappedComponent connected={false} />).toJSON();
    expect(AddSwapForm).toMatchSnapshot();
  });
});

describe('Element testing SwapForm Component', () => {
  it('render correctly SwapForm with default props', async () => {
    const { getAllByText } = render(<WrappedComponent />);
    expect(getAllByText(/Swap Yes/i).length).toBe(1);
  });

  it('render correctly SwapForm with different Title', async () => {
    const { getAllByText } = render(<WrappedComponent title="Swap No" />);
    expect(getAllByText(/Swap No/i).length).toBe(1);
  });
});
