import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MintForm, MintFormProps } from './MintForm';

const defaultArgs: MintFormProps = {
  tokenName: 'PMM',
  title: 'Mint',
  handleSubmit: jest.fn(),
  marketId: '1',
  connected: true,
};

describe('Snapshot - render MintForm', () => {
  it('renders correctly with default props', () => {
    const Form = renderer.create(<MintForm {...defaultArgs} />).toJSON();
    expect(Form).toMatchSnapshot();
  });
});

describe('Element testing MintForm Component', () => {
  it('render correctly MintForm with default props', async () => {
    const { getByText } = render(<MintForm {...defaultArgs} />);
    expect(getByText(/Mint/i)).toBeInTheDocument();
  });

  it('render correctly MintForm with different Title', async () => {
    const { getAllByText } = render(<MintForm {...defaultArgs} title="burn" />);
    expect(getAllByText(/Burn/i).length).toBe(1);
  });
});
