import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { SwapForm, SwapFormProps } from './SwapForm';
import { TokenType } from '../../../interfaces';

const basicArgs = {
  tokenName: 'PMM',
  title: 'Swap Yes',
  marketId: '3',
};

const defaultArgs: SwapFormProps = {
  ...basicArgs,
  swapTokenType: TokenType.yes,
  handleSubmit: jest.fn(),
};

describe('Snapshot - render SwapForm', () => {
  it('renders correctly with default props', () => {
    const AddSwapForm = renderer.create(<SwapForm {...defaultArgs} />).toJSON();
    expect(AddSwapForm).toMatchSnapshot();
  });
});

describe('Element testing SwapForm Component', () => {
  it('render correctly SwapForm with default props', async () => {
    const { getAllByText } = render(<SwapForm {...defaultArgs} />);
    expect(getAllByText(/Swap Yes/i).length).toBe(1);
  });

  it('render correctly SwapForm with different Title', async () => {
    const { getAllByText } = render(<SwapForm {...defaultArgs} title="Swap No" />);
    expect(getAllByText(/Swap No/i).length).toBe(1);
  });
});
