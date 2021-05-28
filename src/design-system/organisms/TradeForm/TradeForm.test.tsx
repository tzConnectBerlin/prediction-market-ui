import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react';
import { TradeForm } from './TradeForm';

const outComeItems = [
  {
    value: 'Yes',
    label: 'Yes (12)',
  },
  {
    value: 'No',
    label: 'No (8)',
  },
];

const basArgs = {
  tokenName: 'USDtz',
  title: 'Buy',
  outComeItems,
};

const defaultArgs = {
  ...basArgs,
  handleSubmit: jest.fn(),
  handleRefreshClick: jest.fn(),
};

describe('Snapshot - render TradeForm', () => {
  it('renders correctly with default props', () => {
    const BuyForm = renderer.create(<TradeForm {...defaultArgs} />).toJSON();
    expect(BuyForm).toMatchSnapshot();
  });
});

describe('Element testing TradeForm Component', () => {
  it('render correctly TradeForm with default props', async () => {
    const { getByText } = render(<TradeForm {...defaultArgs} />);

    expect(getByText(/Yes/i)).toBeInTheDocument();
    expect(getByText(/No/i)).toBeInTheDocument();
  });

  it('render correctly TradeForm with correct Title', async () => {
    const { getAllByText } = render(<TradeForm {...defaultArgs} />);
    expect(getAllByText(/Buy/i).length).toBe(2);
  });

  it('render correctly TradeForm with different Title', async () => {
    const { getAllByText } = render(<TradeForm {...defaultArgs} title="Sell" />);
    expect(getAllByText(/Sell/i).length).toBe(2);
  });

  it('check refreshChip gets called', async () => {
    const { findAllByRole } = render(<TradeForm {...defaultArgs} />);
    const components = await findAllByRole('button');
    act(() => {
      fireEvent.click(components[0]);
    });
    expect(defaultArgs.handleRefreshClick).toBeCalled();
  });
});
