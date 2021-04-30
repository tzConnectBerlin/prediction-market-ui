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

const Template: Story<CustomTableProps> = (args) => <CustomTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  dataList: list,
};
