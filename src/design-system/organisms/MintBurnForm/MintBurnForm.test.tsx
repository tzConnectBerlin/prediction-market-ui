import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { MintBurnForm, MintBurnFormProps } from './MintBurnForm';
import { MarketEnterExitDirection } from '../../../interfaces';
import { lightTheme } from '../../../styles/theme';

const defaultArgs: MintBurnFormProps = {
  tokenName: 'PMM',
  title: 'Mint',
  handleSubmit: jest.fn(),
  marketId: '1',
  connected: true,
  direction: MarketEnterExitDirection.mint,
};

const WrappedComponent = (args: MintBurnFormProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <MintBurnForm {...defaultArgs} {...args} />
    </ThemeProvider>
  );
};

describe('Snapshot - render MintBurnForm', () => {
  it('renders correctly with default props', () => {
    const Form = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(Form).toMatchSnapshot();
  });
});

describe('Element testing MintBurnForm Component', () => {
  it('render correctly MintForm with default props', async () => {
    const { getByText } = render(<WrappedComponent {...defaultArgs} />);
    expect(getByText(/Mint/i)).toBeInTheDocument();
  });

  it('render correctly MintForm with different Title', async () => {
    const { getAllByText } = render(<WrappedComponent {...defaultArgs} title="burn" />);
    expect(getAllByText(/Burn/i).length).toBe(1);
  });
});
