import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { PortfolioTable, PortfolioTableProps, Row } from './PortfolioTable';

const heading: string[] = ['Market', 'Status', 'Role', 'Shares', 'Share Price', 'Total', ''];

const rowList: Row[] = [
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
  {
    columns: [
      'Will Biden be President on January 21, 2022?',
      'Open',
      'Adjudicator',
      '10',
      '$ 0.95',
      '$ 0.95',
    ],
    rowAction: {
      label: 'Close Market',
      handleAction: () => console.log('hi'),
    },
  },
];

const requiredProps: PortfolioTableProps = {
  rows: rowList,
  heading,
};
describe('Snapshot testing Table Component', () => {
  it.skip('renders correctly with requiredProps', () => {
    const Table = renderer.create(<PortfolioTable {...requiredProps} />).toJSON();
    expect(Table).toMatchSnapshot();
  });

  it.skip('renders correctly with title', () => {
    const Table = renderer.create(<PortfolioTable {...requiredProps} title="Market" />).toJSON();
    expect(Table).toMatchSnapshot();
  });
});

describe('Element testing Table Component', () => {
  it('render correctly with requiredProps', async () => {
    const { getByText } = render(<PortfolioTable {...requiredProps} />);

    expect(getByText(/Status/i)).toBeInTheDocument();
    expect(getByText(/Role/i)).toBeInTheDocument();
  });

  it('render correctly with title', async () => {
    const { getByText } = render(<PortfolioTable {...requiredProps} title="Auction" />);

    expect(getByText(/Auction/i)).toBeInTheDocument();
  });
});
