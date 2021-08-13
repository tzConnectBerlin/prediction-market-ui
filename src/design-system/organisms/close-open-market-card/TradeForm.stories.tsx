import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TradeForm, TradeFormProps } from './TradeForm';

export default {
  title: 'Organism/TradeForm',
  component: TradeForm,
} as Meta;

const outcomeItems = [
  {
    value: '12$',
    label: 'Yes',
  },
  {
    value: '8$',
    label: 'No',
  },
];

const Template: Story<TradeFormProps> = (args) => <TradeForm {...args} />;

export const Buy = Template.bind({});
Buy.args = {
  tokenName: 'PMM',
  title: 'Buy',
  outcomeItems,
  handleSubmit: () => console.log('submit'),
};

export const Sell = Template.bind({});
Sell.args = {
  tokenName: 'PMM',
  title: 'Sell',
  outcomeItems,
  handleSubmit: () => console.log('submit'),
};
