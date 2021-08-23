import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { LiquidityForm, LiquidityFormProps } from './LiquidityForm';

export default {
  title: 'Organism/LiquidityForm',
  component: LiquidityForm,
} as Meta;

const Template: Story<LiquidityFormProps> = (args) => <LiquidityForm {...args} />;

export const AddLiquidity = Template.bind({});
AddLiquidity.args = {
  tokenName: 'PMM',
  title: 'Add Liquidity',
  handleSubmit: () => console.log('submit'),
};

export const Liquidity = Template.bind({});
Liquidity.args = {
  tokenName: 'PMM',
  title: ' Liquidity',
  handleSubmit: () => console.log('submit'),
};
