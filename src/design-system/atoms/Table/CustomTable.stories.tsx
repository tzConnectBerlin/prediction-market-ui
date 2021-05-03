import { GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CustomTable, CustomTableProps } from './CustomTable';

export default {
  title: 'Atom/CustomTable',
  component: CustomTable,
} as Meta;

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

const columnList: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rowList = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const Template: Story<CustomTableProps> = (args) => <CustomTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  dataList: list,
  rowsList: rowList,
  columnsList: columnList,
};
