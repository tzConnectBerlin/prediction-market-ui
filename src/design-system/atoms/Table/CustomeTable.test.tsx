import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { CustomTable } from './CustomTable';

const list = [
  {
    date: '5 MAR 2021',
    adsress: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'no',
    quantity: 200,
  },
  {
    date: '4 MAR 2021',
    adsress: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'yes',
    quantity: 20,
  },
  {
    date: '3 MAR 2021',
    adsress: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'no',
    quantity: 50,
  },
  {
    date: '2 MAR 2021',
    adsress: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    outcome: 'yes',
    quantity: 100,
  },
];

describe('Snapshot testing Table Component', () => {
  it('renders correctly', () => {
    const Table = renderer.create(<CustomTable dataList={list} />).toJSON();
    expect(Table).toMatchSnapshot();
  });
});

describe('Element testing Table Component', () => {
  it('render correctly with mock data', async () => {
    const { container, getByText } = render(<CustomTable dataList={list} />);
    const cols = container.querySelectorAll('th');
    expect(cols.length).toBe(4);
    expect(getByText(/5 MAR 2021/i)).toBeInTheDocument();
  });
});
