import { Story, Meta } from '@storybook/react/types-6-0';
import { TradeForm, TradeFormProps } from './TradeForm';

export default {
  title: 'Organism/TradeForm',
  component: TradeForm,
} as Meta;

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

const Template: Story<TradeFormProps> = (args) => <TradeForm {...args} />;

export const Buy = Template.bind({});
Buy.args = {
  tokenName: 'USDtz',
  title: 'Buy',
  outComeItems,
  handleSubmit: () => console.log('submit'),
  handleRefreshClick: (e: any) => console.log(e.target.outerText),
};

export const Sell = Template.bind({});
Sell.args = {
  tokenName: 'USDtz',
  title: 'Sell',
  outComeItems,
  handleSubmit: () => console.log('submit'),
  handleRefreshClick: (e: any) => console.log(e.target.outerText),
};
