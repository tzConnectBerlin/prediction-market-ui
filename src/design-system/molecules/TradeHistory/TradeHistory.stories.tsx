import { Story, Meta } from '@storybook/react/types-6-0';
import { GridColDef } from '@material-ui/data-grid';
import { TradeHistory, TradeHistoryProps } from './TradeHistory';

export default {
  title: 'Molecule/TradeHistory',
  component: TradeHistory,
} as Meta;

const columnList: GridColDef[] = [
  { field: 'date', headerName: 'Date', type: 'date', flex: 1 },
  { field: 'address', headerName: 'User Address', flex: 1.5 },
  { field: 'outcome', headerName: 'Outcome', flex: 1 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    flex: 0.8,
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
const Template: Story<TradeHistoryProps> = (args) => <TradeHistory {...args} />;

export const Default = Template.bind({});
Default.args = {
  rows: rowList,
  columns: columnList,
  hideFooterPagination: true,
};

export const Pageination = Template.bind({});
Pageination.args = {
  rows: rowList,
  columns: columnList,
  pageSize: 5,
};
