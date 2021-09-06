import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SwapForm, SwapFormProps } from './SwapForm';

export default {
  title: 'Organism/SwapForm',
  component: SwapForm,
} as Meta;

const Template: Story<SwapFormProps> = (args) => <SwapForm {...args} />;

export const Mint = Template.bind({});
Mint.args = {
  tokenName: 'PMM',
  title: 'Mint',
  handleSubmit: () => console.log('submit'),
};
