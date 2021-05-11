import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { GridColDef } from '@material-ui/data-grid';
import { TradeHistory } from './TradeHistory';

const columnList: GridColDef[] = [
  { field: 'date', headerName: 'Date', type: 'date', flex: 1 },
  { field: 'address', headerName: 'User Address', flex: 1 },
  { field: 'outcome', headerName: 'Outcome', flex: 1 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    flex: 1,
  },
];

const rowList = [
  {
    id: 1,
    date: '5 MAR 2021',
    address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'no',
    quantity: 200,
  },
  {
    id: 2,
    date: '4 MAR 2021',
    address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'yes',
    quantity: 20,
  },
  {
    id: 3,
    date: '3 MAR 2021',
    address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'no',
    quantity: 50,
  },
  {
    id: 4,
    date: '2 MAR 2021',
    address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'yes',
    quantity: 100,
  },
];

describe('Snapshot testing Table Component', () => {
  it('renders correctly', () => {
    const Table = renderer.create(<TradeHistory columns={columnList} rows={rowList} />).toJSON();
    expect(Table).toMatchSnapshot();
  });
});

describe('Element testing Table Component', () => {
  it('render correctly with mock data', async () => {
    const { getByText } = render(
      <TradeHistory columns={columnList} rows={rowList} title="Test Title" />,
    );

    expect(getByText(/Test Title/i)).toBeInTheDocument();
    expect(getByText(/5 MAR 2021/i)).toBeInTheDocument();
  });
});
