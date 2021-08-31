import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MintBurnForm, MintBurnFormProps } from './MintBurnForm';
import { MarketEnterExitDirection } from '../../../interfaces';

const defaultArgs: MintBurnFormProps = {
  tokenName: 'PMM',
  title: 'Mint',
  handleSubmit: jest.fn(),
  marketId: '1',
  connected: true,
  direction: MarketEnterExitDirection.mint,
};

describe('Snapshot - render MintBurnForm', () => {
  it('renders correctly with default props', () => {
    const Form = renderer.create(<MintBurnForm {...defaultArgs} />).toJSON();
    expect(Form).toMatchSnapshot();
  });
});

describe('Element testing MintBurnForm Component', () => {
  it('render correctly MintForm with default props', async () => {
    const { getByText } = render(<MintBurnForm {...defaultArgs} />);
    expect(getByText(/Mint/i)).toBeInTheDocument();
  });

  it('render correctly MintForm with different Title', async () => {
    const { getAllByText } = render(<MintBurnForm {...defaultArgs} title="burn" />);
    expect(getAllByText(/Burn/i).length).toBe(1);
  });
});
